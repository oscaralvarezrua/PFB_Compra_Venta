const { UPLOADS_DIR } = process.env;
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
