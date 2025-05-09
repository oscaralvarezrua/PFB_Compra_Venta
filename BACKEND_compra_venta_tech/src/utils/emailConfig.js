import nodemailer from "nodemailer";
import { generateError } from "./helpers.js";

const {
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_PORT,
  FRONTEND_URL,
  SENDERS_EMAIL,
  COLOR_CODE,
} = process.env;

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail(email, subject, html) {
  console.log("=== INICIO DE ENVÍO DE CORREO ===");
  console.log("Variables de entorno:", {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER: SMTP_USER ? "Configurado" : "No configurado",
    SMTP_PASSWORD: SMTP_PASSWORD ? "Configurado" : "No configurado",
    SENDERS_EMAIL,
  });

  let options = {
    from: {
      name: "Segunda Tec",
      address: SENDERS_EMAIL,
    },
    to: email,
    subject,
    html,
  };

  console.log("Opciones del correo:", {
    from: options.from,
    to: options.to,
    subject: options.subject,
  });

  try {
    console.log("Intentando conectar al servidor SMTP...");
    const info = await transporter.sendMail(options);
    console.log("=== CORREO ENVIADO EXITOSAMENTE ===");
    console.log("MessageId:", info.messageId);
    console.log("Respuesta del servidor:", info.response);
    return info;
  } catch (e) {
    console.error("=== ERROR AL ENVIAR EL CORREO ===");
    console.error("Tipo de error:", e.name);
    console.error("Mensaje de error:", e.message);
    console.error("Stack completo:", e.stack);
    throw generateError("Error al enviar el email: " + e.message, 500);
  }
}

//Enviar el correo de validación
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

    const validationUrl = `${FRONTEND_URL}/validate/${validationCode}`;

    //Correo de validacion
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

    await sendMail(mailOptions.to, mailOptions.subject, mailOptions.html);

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

export async function sendTransactionRequest(
  sellerEmail,
  buyerUser,
  productName
) {
  let subject = "Nueva petición de compra";
  /*let text = `El usuario ${buyerUser} quiere comprar tu producto ${productName}.\nHaz click en el siguiente enlace para aceptar o rechazar la transacción:\n${BACKEND_URL}/request?transactionId=${transactionId}`;*/
  let html = `
                <h1>¡Enhorabuena!</h1>
                <p>El usuario <strong>${buyerUser}</strong>  quiere comprar tu producto <strong>${productName}</strong> .\nHaz click en el siguiente enlace para aceptar o rechazar la transacción:</p>
                <a href="${FRONTEND_URL}/user/requests-list" style="display: inline-block; padding: 10px 20px; background-color: #${COLOR_CODE}; color: black; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                    Ver transacción
                </a>
                <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                <p>${FRONTEND_URL}/user/requests-list</p>
                <p>Si no has iniciado ninguna solicitud de compra en Segunda Tec, puedes ignorar este correo.</p>
            `;

  await sendMail(sellerEmail, subject, html);
}

//Enviar el correo de recuperación de contraseña
export const sendRecoveryEmail = async (email, recoveryCode) => {
  try {
    console.log("Iniciando envío de correo de recuperación...");
    console.log("Configuración SMTP:", {
      host: SMTP_HOST,
      apiKeyConfigured: "Sí",
    });

    const recoveryUrl = `${FRONTEND_URL}/recover/${recoveryCode}`;

    //Correo de recuperación
    const html = `
      <h1>Recupera aquí tu contraseña!</h1>
      <p>¿No recuerdas tu contraseña? No te preocupes, nosotros te ayudamos a recuperarla.</p>
      <p>Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
      <a href="${recoveryUrl}" style="display: inline-block; padding: 10px 20px; background-color: #${COLOR_CODE}; color: black; text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Recuperar contraseña
      </a>
      <p>Si el botón no funciona también puedes copiar y pegar el siguiente enlace en tu navegador:</p>
      <p>${recoveryUrl}</p>
      <p>Este enlace expirará en 1 hora por seguridad.</p>
      <p>Si no has solicitado recuperar tu contraseña, puedes ignorar este correo.</p>
    `;

    console.log("Opciones del correo de recuperación:", {
      to: email,
      subject: "Recuperación de contraseña - Segunda Tec",
    });

    await sendMail(email, "Recuperación de contraseña - Segunda Tec", html);

    return true;
  } catch (error) {
    console.error("Error detallado al enviar el correo de recuperación:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw new Error("Error al enviar el correo de recuperación");
  }
};

export async function sendProductRejectionEmail(
  userEmail,
  userName,
  productName
) {
  try {
    console.log("Iniciando envío de correo de rechazo...");
    console.log("Configuración SMTP:", {
      host: SMTP_HOST,
      apiKeyConfigured: "Sí",
    });

    const html = `
      <h1>Hola ${userName},</h1>
      <p>Tu producto "${productName}" ha sido rechazado por no cumplir las políticas de la web.</p>
      <p>Motivo: No cumple las políticas de publicación.</p>
      <p>Por favor, revisa nuestras políticas y vuelve a intentarlo.</p>
      <p>Saludos,<br>El equipo de Segunda Tec</p>
    `;

    console.log("Opciones del correo de rechazo:", {
      to: userEmail,
      subject: "Tu producto ha sido rechazado",
    });

    await sendMail(userEmail, "Tu producto ha sido rechazado", html);

    return true;
  } catch (error) {
    console.error("Error detallado al enviar el correo de rechazo:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw new Error("Error al enviar el correo de rechazo");
  }
}

export async function sendPurchaseRejectionEmail(
  buyerEmail,
  buyerName,
  productName,
  sellerName,
  reason
) {
  try {
    console.log("Iniciando envío de correo de rechazo de compra...");
    console.log("Configuración SMTP:", {
      host: SMTP_HOST,
      apiKeyConfigured: "Sí",
    });

    const html = `
      <h1>Hola ${buyerName},</h1>
      <p>Tu solicitud de compra para el producto "<strong>${productName}</strong>" ha sido rechazada por el vendedor ${sellerName}.</p>
      <p>Motivo: ${reason}</p>
      <p>Puedes buscar otros productos similares en nuestra plataforma.</p>
      <p>Saludos,<br>El equipo de Segunda Tec</p>
    `;

    console.log("Opciones del correo de rechazo de compra:", {
      to: buyerEmail,
      subject: "Tu solicitud de compra ha sido rechazada",
    });

    await sendMail(
      buyerEmail,
      "Tu solicitud de compra ha sido rechazada",
      html
    );

    return true;
  } catch (error) {
    console.error("Error detallado al enviar el correo de rechazo de compra:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw new Error("Error al enviar el correo de rechazo de compra");
  }
}
