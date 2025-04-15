import getPool from "../db/getPool.js";
import { generateError } from "../utils/helpers.js";

//Creamos función para aceptar un producto
export async function acceptProduct(productId) {
  //Conexión con la base de datos
  const pool = await getPool();
  //actualizamos is_accepted del producto por su id
  const [{ affectedRows }] = await pool.query(
    `UPDATE product SET is_accepted = true WHERE id =?`,
    [productId]
  );
  //si no se ha modificado ninfuna fila(affectedRows) es xq no existe el producto(404)
  if (affectedRows === 0) {
    throw generateError("El producto no ha sido encontrado", 404);
  }
}

//Creamos función para obtener los detalles de un producto
export async function getProductById(productId) {
  const pool = await getPool();

  const [result] = await pool.query(
    `
    SELECT * FROM product WHERE id = ?`,
    [productId]
  );
  if (result.length === 0) {
    throw generateError("Ese producto no existe", 404);
  }
  return result[0];
}
