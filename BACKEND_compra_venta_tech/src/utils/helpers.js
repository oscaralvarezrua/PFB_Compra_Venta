import nodemailer from "nodemailer";
const {
  UPLOADS_DIR,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASSWORD,
  SMTP_PORT,
  FRONTEND_URL,
} = process.env;
import path from "path";
import { v4 as uuidv4 } from "uuid";

//Funciones reutilizables
export function generateError(msg, code) {
  let error = new Error(msg);
  error.httpCode = code;
  return error;
}

export async function savePhoto(photo) {
  const allowedExtensions = /^(jpg|jpeg|png|gif)$/;
  const extension = path.extname(photo.name).toLowerCase().slice(1);

  if (!allowedExtensions.test(extension)) {
    throw generateError(
      "Formato de imagen no válido. Usa jpg, jpeg, png o gif.",
      400
    );
  }

  const photoName = `${uuidv4()}.${extension}`;
  const uploadPath = path.resolve(UPLOADS_DIR, photoName);

  await photo.mv(uploadPath);

  return photoName;
}

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export async function sendMail(email, subject, text, html) {
  let options = {
    from: SMTP_USER,
    to: email,
    subject,
    text,
    html,
  };

  try {
    await transport.sendMail(options);
  } catch (e) {
    console.error("Error real al enviar el email:", e);
    throw generateError("Error al enviar el email", 500);
  }
}

export async function sendTransactionRequest(
  sellerEmail,
  buyerUser,
  productName,
  transactionId
) {
  let subject = "Nueva petición de compra";
  let text = `El usuario ${buyerUser} quiere comprar tu producto ${productName}.\nHaz click en el siguiente enlace para aceptar o rechazar la transacción:\n${FRONTEND_URL}/request?transactionId=${transactionId}`;
  let html = `
  <a href="${FRONTEND_URL}/request?transactionId=${transactionId}">Haz click aquí para aceptar o rechazar la transacción</a>
  
  `;
  await sendMail(sellerEmail, subject, text, html);
}
