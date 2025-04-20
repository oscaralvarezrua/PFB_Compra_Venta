import getPool from "../db/getPool.js";

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
    throw new Error("Error al obtener las categorias");
  }
}
