import nodemailer from "nodemailer";

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com", // Dominio alternativo de Brevo
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función para enviar el correo de validación
export const sendValidationEmail = async (email, username, validationCode) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("La API Key de Brevo no está configurada");
    }

    console.log("Iniciando envío de correo...");
    console.log("Configuración SMTP:", {
      host: "smtp-relay.sendinblue.com",
      apiKeyConfigured: "Sí",
    });

    const validationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/users/validate/${validationCode}`;

    // Configuración del correo
    const mailOptions = {
      from: {
        name: "Segunda Tec",
        address: "noreply@oscaralvarez.me",
      },
      to: email,
      subject: "¡Valida tu cuenta en Segunda Tec!",
      html: `
                <h1>¡Bienvenido/a ${username}!</h1>
                <p>Gracias por registrarte en Segunda Tec. Para comenzar a usar tu cuenta, necesitamos que la valides haciendo clic en el siguiente enlace:</p>
                <a href="${validationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
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
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente:", info.messageId);
    console.log("Respuesta del servidor:", info.response);

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
