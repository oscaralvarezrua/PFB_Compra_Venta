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
  try {
    const allowedExtensions = /^(jpg|jpeg|png|gif)$/;
    const extension = path.extname(photo.name).toLowerCase().slice(1);

    if (!allowedExtensions.test(extension)) {
      throw generateError("Formato de imagen no válido. Usa jpg, jpeg, png o gif.", 400);
    }

    // Verificar el tamaño del archivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (photo.size > maxSize) {
      throw generateError("El archivo es demasiado grande. El tamaño máximo es 5MB.", 400);
    }

    const photoName = `${uuidv4()}.${extension}`;
    const uploadPath = path.resolve(UPLOADS_DIR, photoName);

    await photo.mv(uploadPath);

    return photoName;
  } catch (error) {
    if (error.httpCode) {
      throw error;
    }
    throw generateError("Error al guardar la imagen.", 500);
  }
}

export async function deletePhoto(photoName) {
  if (!photoName) return;
  try {
    const photoPath = path.resolve(UPLOADS_DIR, photoName);
    await fs.unlink(photoPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn("La foto no existe:", photoName);
    } else {
      console.error("Error al borrar la foto:", err);
      throw generateError("Error al borrar la foto.", 500);
    }
  }
}
