//Interactuar con la base de datos

import getPool from "../db/getPool.js";
import { generateError } from "../utils/helpers.js";

// Modelo para obtener la lista de usuarios
export async function getUserListModel() {
  const pool = await getPool();
  const [users] = await pool.query(
    "SELECT id, username, email, avatar FROM user"
  );
  return users;
}

// Modelo para obtener el detalle de un usuario con histórico de ventas y compras
export async function getUserDetailModel(userId) {
  const pool = await getPool();

  const [user] = await pool.query(
    "SELECT id, username, email, biography, avatar FROM user WHERE id = ?",
    [userId]
  );
  if (user.length === 0) {
    throw generateError("Usuario no encontrado", 404);
  }

  const [ventas] = await pool.query(
    `SELECT 
       t.id AS transaccion_id,
       p.name AS producto,
       t.status,
       t.ratings,
       t.comment,
       t.created_at
     FROM transaction t
     JOIN product p ON t.product_id = p.id
     WHERE p.user_id = ?`,
    [userId]
  );

  const [compras] = await pool.query(
    `SELECT 
       t.id AS transaccion_id,
       p.name AS producto,
       t.status,
       t.ratings,
       t.comment,
       t.created_at
     FROM transaction t
     JOIN product p ON t.product_id = p.id
     WHERE t.user_id = ?`,
    [userId]
  );

  return {
    usuario: user[0],
    historico_ventas: ventas,
    historico_compras: compras,
  };
}
