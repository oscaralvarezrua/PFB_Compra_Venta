//Creamos la función para ver si un ususrio es administrador o no

import { generateError } from "../utils/helpers.js";

export default function checkAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return next(
      generateError("No eres administrador, no tienes permiso!", 403)
    ); //Error 403 "Forbidden", no htiene suficientes permisos
  }
  next();
}
