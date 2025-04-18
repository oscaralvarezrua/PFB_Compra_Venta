//Interactuar con la base de datos

import getPool from "../db/getPool.js";
//import bcrypt from "bcryptjs";
import { generateError } from "../utils/helpers.js";
//import { encodeXText } from "nodemailer/lib/shared/index.js";

async function createTransaction(buyerId, productId) {
  try {
    const pool = await getPool();
    //crear transaccion
    const [result] = await pool.query(
      `INSERT INTO transaction (status, user_id, product_id)
            VALUES (?, ?, ?)`,
      ["pending", buyerId, productId]
    );

    return result;
  } catch (e) {
    console.error("Error al crear la transacción: ", e);
    throw generateError("Error al crear la transacción", 404);
  }
}

async function getTransaction(buyerId, productId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM transaction WHERE user_id = ? AND product_id = ?`,
      [buyerId, productId]
    );

    return result[0];
  } catch (e) {
    console.error("Error buscando la transacción: ", e);
    throw generateError("Error buscando la transacción", 404);
  }
}

async function getSellerEmail(productId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT u.email FROM user u JOIN product p ON p.user_id = u.id
WHERE p.id = ?`,
      [productId]
    );

    return result[0].email;
  } catch (e) {
    console.error("Error buscando el usuario vendedor: ", e);
    throw generateError("Error buscando el usuario vendedor", 404);
  }
}

async function getTransactionListModel(userId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT * FROM transaction t JOIN product p WHERE t.product_id = p.id AND p.user_id = ? `,
      [userId]
    );

    return result;
  } catch (e) {
    console.error("Error al mostrar lista de transacciones: ", e);
    throw generateError("Error al mostrar lista de transacciones", 404);
  }
}
async function getSellerID(productId) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT p.user_id FROM product p WHERE p.id = ? `,
      [productId]
    );

    return result[0].user_id;
  } catch (e) {
    console.error("Error al encontrar usuario: ", e);
    throw generateError("Error al encontrar usuario", 404);
  }
}

async function setTransactionStateModel(transID, status) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "UPDATE transaction SET status = ? WHERE id = ?",
      [status, transID]
    );
    return result;
  } catch (e) {
    console.error("Error al encontrar transacción: ", e);
    throw generateError("Error al encontrar transacción", 404);
  }
}

async function isAvailable(product_id) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      "SELECT is_available FROM product WHERE id = ?",
      [product_id]
    );
    return result[0];
  } catch (e) {
    console.error("Error al encontrar producto: ", e);
    throw generateError("Error al encontrar producto", 404);
  }
}

export {
  createTransaction,
  getTransaction,
  getSellerEmail,
  getTransactionListModel,
  getSellerID,
  setTransactionStateModel,
  isAvailable,
};
