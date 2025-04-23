import nodemailer from "nodemailer";
import { generateError } from "./helpers.js";

const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_PORT, FRONTEND_URL, SENDERS_EMAIL, COLOR_CODE } = process.env;

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export async function sendMail(email, subject, html) {
  let options = {
    from: {
      name: "Segunda Tec",
      address: SENDERS_EMAIL,
    },
    to: email,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(options);
    console.log("Correo enviado exitosamente:", info.messageId);
    console.log("Respuesta del servidor:", info.response);
  } catch (e) {
    console.error("Error real al enviar el email:", e);
    throw generateError("Error al enviar el email", 500);
  }
}

// Función para enviar el correo de validación
export const sendValidationEmail = async (email, username, validationCode) => {
  try {
    /*if (!process.env.BREVO_API_KEY) {
      throw new Error("La API Key de Brevo no está configurada");
    }*/

    console.log("Iniciando envío de correo...");
    console.log("Configuración SMTP:", {
      host: SMTP_HOST,
      apiKeyConfigured: "Sí",
    });

    const validationUrl = `${FRONTEND_URL}/users/validate/${validationCode}`;

    // Configuración del correo de validacion
    const mailOptions = {
      from: {
        name: "Segunda Tec",
        address: SENDERS_EMAIL,
      },
      to: email,
      subject: "¡Valida tu cuenta en Segunda Tec!",
      html: `
                <h1>¡Bienvenido/a ${username}!</h1>
                <p>Gracias por registrarte en Segunda Tec. Para comenzar a usar tu cuenta, necesitamos que la valides haciendo clic en el siguiente enlace:</p>
                <a href="${validationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #${COLOR_CODE}; color: black; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                    Validar mi cuenta
                </a>
                <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                <p>${validationUrl}</p>
                <p>Este enlace expirará en 24 horas por seguridad.</p>
                <p>Si no has creado una cuenta en Segunda Tec, puedes ignorar este correo.</p>
            `,
    };

    console.log("Opciones del correo:", {
      from: mailOptions.from.address,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Enviar el correo
    //const info = await transporter.sendMail(mailOptions);
    await sendMail(mailOptions.to, mailOptions.subject, mailOptions.html);
    // console.log("Correo enviado exitosamente:", info.messageId);
    //console.log("Respuesta del servidor:", info.response);

    return true;
  } catch (error) {
    console.error("Error detallado al enviar el correo:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw new Error("Error al enviar el correo de validación");
  }
};

export async function sendTransactionRequest(sellerEmail, buyerUser, productName, transactionId) {
  let subject = "Nueva petición de compra";
  /*let text = `El usuario ${buyerUser} quiere comprar tu producto ${productName}.\nHaz click en el siguiente enlace para aceptar o rechazar la transacción:\n${FRONTEND_URL}/request?transactionId=${transactionId}`;*/
  let html = `
                <h1>¡Enhorabuena!</h1>
                <p>El usuario <strong>${buyerUser}</strong>  quiere comprar tu producto <strong>${productName}</strong> .\nHaz click en el siguiente enlace para aceptar o rechazar la transacción:</p>
                <a href="${FRONTEND_URL}/request?transactionId=${transactionId}" style="display: inline-block; padding: 10px 20px; background-color: #${COLOR_CODE}; color: black; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                    Ver transacción
                </a>
                <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                <p>${FRONTEND_URL}/request?transactionId=${transactionId}</p>
                <p>Si no has iniciado ninguna solicitud de compra en Segunda Tec, puedes ignorar este correo.</p>
            `;

  await sendMail(sellerEmail, subject, html);
}
