import jwt from "jsonwebtoken";
import { getUserById } from "../models/userModels.js";

export default async function checkOptionalAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];

      if (token) {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await getUserById(userInfo.id);
        req.user = userData;
      }
    }

    next();
  } catch (err) {
    // Si falla el token, lo ignoramos
    next();
  }
}
