//Autenticación y autorización

import jwt from "jsonwebtoken";
import { generateError } from "../utils/helpers.js";

const authUserController = async (req, res, next) => {
  try {
    // Obtenemos el token de la cabecera de la petición.
    const { authorization } = req.headers;

    // Si falta el token lanzamos un error.
    if (!authorization) {
      generateError("Falta la cabecera de autorización", 401);
    }

    try {
      // Desencriptamos el token.
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);

      req.user = tokenInfo;

      // Pasamos el control al siguiente middleware.
      next();
    } catch (err) {
      console.error(err);

      generateError("Token inválido", 401);
    }
  } catch (err) {
    next(err);
  }
};

export default authUserController;
