import getPool from "../db/getPool.js";

import { generateError } from "../utils/helpers.js";

//Crea nuevo administrador
export default async function setAdminModel(userId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "UPDATE user SET role = 'admin' WHERE id =  ?",
      [userId]
    );

    return result;
  } catch (e) {
    console.error("Error cambiando estado de usuario: ", e);
    throw generateError("No se ha podido cambiar el estado del usuario", 404);
  }
}
