const { UPLOADS_DIR } = process.env;
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

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

export async function deletePhoto(photoName) {
  try {
    const photoPath = path.resolve(UPLOADS_DIR, photoName);
    await fs.unlink(photoPath);
  } catch (err) {
    // Si el archivo no existe, puedes ignorar el error o lanzar uno personalizado
    if (err.code === "ENOENT") {
      throw generateError("La foto no existe.", 404);
    } else {
      throw generateError("Error al borrar la foto.", 500);
    }
  }
}
