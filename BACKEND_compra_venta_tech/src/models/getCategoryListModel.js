import getPool from "../db/getPool.js";
import { generateError } from "../utils/helpers.js";

export default async function getCategoryListModel() {
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `
    SELECT * FROM category;
    `
    );
    return result;
  } catch (error) {
    console.error("Error obteniendo las categorias: ", error);
    throw generateError("Error al obtener las categorias", 401);
  }
}
