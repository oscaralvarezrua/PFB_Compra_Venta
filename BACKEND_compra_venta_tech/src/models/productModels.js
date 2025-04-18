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
  try {
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
  } catch (error) {
    console.error("Producto no encontrado: ", error);
    throw new Error("Producto no encontrado");
  }
}

//Creamos Función para la publicación de un producto
export async function publishProduct(
  name,
  description,
  price,
  photoURL,
  locality,
  userid,
  categoryid
) {
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `
    INSERT INTO product (name, description, price, photo, locality, user_id, category_id)
    VALUES (?,?,?,?,?,?,?)
    `,
      [name, description, price, photoURL, locality, userid, categoryid]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creando el producto: ", error);
    throw new Error("Error al crear el producto");
  }
}
export async function getAcceptProductListModel() {
  try {
    const pool = await getPool();
    const [result] = await pool.query(
      `
    SELECT * FROM product p WHERE p.is_accepted = true;
    `
    );
    return result;
  } catch (error) {
    console.error("Error obteniedno Productos: ", error);
    throw new Error("Error al obtener Productos");
  }
}

export async function deleteProductModel(productId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query("DELETE FROM product WHERE id = ?", [
      productId,
    ]);

    return result;
  } catch (error) {
    console.error("Error al borrar producto: ", error);
    throw new Error("Error al borrar producto");
  }
}

export async function setProductAsSoldModel(productId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "UPDATE product SET is_available = false WHERE id = ?",
      [productId]
    );
    console.log(productId);

    return result[0];
  } catch (e) {
    console.error("Error al encontrar usuario: ", e);
    throw generateError("Error al encontrar usuario", 404);
  }
}

export async function updateProductbyId(productId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "UPDATE product SET name = ?, description = ?, price = ?, photo = ?,locality = ?, is_available = ?, is_accepted = ?, user_id = ?, category_id = ? WHERE id = ?",
      [productId]
    );
  } catch (error) {}
}
