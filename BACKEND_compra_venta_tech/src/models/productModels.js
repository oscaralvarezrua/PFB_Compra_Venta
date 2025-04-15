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
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.photo,
      p.locality,
      p.is_available,
      p.is_accepted,
      p.created_at,
      p.updated_at,

      c.id AS category_id,
      c.name AS category_name,

      u.id AS seller_id,
      u.username AS seller_username,
      u.email AS seller_email,
      u.avatar AS seller_avatar,
      u.phone AS seller_phone
    FROM product p
    JOIN category c ON p.category_id = c.id
    JOIN user u ON p.user_id = u.id
    WHERE p.id = ?
    `,
    [productId]
  );

  if (result.length === 0) {
    throw generateError("Ese producto no existe", 404);
  }

  return result[0];
}
