//Interactuar con la base de datos

import getPool from "../db/getPool.js";
//import bcrypt from "bcryptjs";
import { generateError } from "../utils/helpers.js";
//import { encodeXText } from "nodemailer/lib/shared/index.js";

async function createTransaction(comment, buyerId, productId) {
  try {
    const pool = await getPool();
    //crear transaccion
    const [result] = await pool.query(
      `INSERT INTO transaction (status, comment, user_id, product_id)
            VALUES (?, ?, ?, ?)`,
      ["pending", comment, buyerId, productId]
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

export { createTransaction, getTransaction, getSellerEmail };
