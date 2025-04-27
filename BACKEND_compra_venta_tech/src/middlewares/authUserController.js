//Autenticación y autorización

import jwt from "jsonwebtoken";
import { generateError } from "../utils/helpers.js";
import { getUserById } from "../models/userModels.js";

const authUserController = async (req, res, next) => {
  try {
    // Obtenemos el token de la cabecera de la petición.
    const { authorization } = req.headers;

    // Si falta el token lanzamos un error.
    if (!authorization) {
      throw generateError("Falta la cabecera de autorización", 401);
    }

    if (!authorization.startsWith("Bearer ")) {
      throw generateError("Formato token no valido", 401);
    }

    const token = authorization.split(" ")[1];

    try {
      // Desencriptamos el token.
      const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);

      const user = await getUserById(tokenInfo.id);

      if (!user) {
        throw generateError("Usuario no encontrado", 401);
      }

      req.user = user;

      // Pasamos el control al siguiente middleware.
      next();
    } catch (err) {
      console.error(err);

      throw generateError("Token inválido", 401);
    }
  } catch (err) {
    next(err);
  }
};

export default authUserController;
