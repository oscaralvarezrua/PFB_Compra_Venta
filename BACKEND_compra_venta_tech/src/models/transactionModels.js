//Interactuar con la base de datos
import getPool from "../db/getPool.js";
//import bcrypt from "bcryptjs";
import { generateError } from "../utils/helpers.js";
//import { encodeXText } from "nodemailer/lib/shared/index.js";
import { setProductAsSoldModel } from "./productModels.js";

async function createTransaction(buyerId, buyerName, productId, sellerID) {
  try {
    const pool = await getPool();
    //crear transaccion
    const [result] = await pool.query(
      `INSERT INTO transaction (status, user_id, username, product_id, seller_id)
            VALUES (?, ?, ?, ?, ?)`,
      ["pending", buyerId, buyerName, productId, sellerID]
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
      `SELECT * FROM transaction WHERE user_id = ? AND product_id = ? AND status = "pending"`,
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

async function getSalesTransactionsModel(userId, status) {
  try {
    const pool = await getPool();
    console.log(userId, status);

    const [result] = await pool.query(
      `SELECT   t.id AS transaction_id,
        t.status,
        t.comment,
        t.ratings,
        t.user_id AS buyer_id,
        t.username AS buyer_name,
        t.product_id,
        t.created_at AS transaction_created_at,
        t.update_at AS transaction_updated_at,
        p.name,
        p.description,
        p.price,
        p.photo,
        p.locality,
        p.is_available,
        p.is_accepted,
        p.category_id,
      p.updated_at AS product_updated_at FROM transaction t JOIN product p ON t.product_id = p.id WHERE t.status = ? AND p.user_id = ? `,
      [status, userId]
    );
    console.log(result);

    return result;
  } catch (e) {
    console.error("Error al mostrar lista de transacciones: ", e);
    throw generateError("Error al mostrar lista de transacciones", 404);
  }
}

async function getBuyTransactionsModel(userId, status) {
  try {
    const pool = await getPool();

    const [result] = await pool.query(
      `SELECT   t.id AS transaction_id,
        t.status,
        t.comment,
        t.ratings,
        t.product_id,
        t.created_at AS transaction_created_at,
        t.update_at AS transaction_updated_at,
        p.user_id AS seller_id,
        p.name,
        p.description,
        p.price,
        p.photo,
        p.locality,
        p.is_available,
        p.is_accepted,
        p.category_id,
    p.updated_at AS product_updated_at FROM transaction t JOIN product p ON t.product_id = p.id WHERE t.status = ? AND t.user_id = ? `,
      [status, userId]
    );
    console.log(result);

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
    if (status === "accepted") {
      const [productId] = await pool.query(
        "SELECT product_id FROM transaction WHERE id = ?",
        [transID]
      );

      setProductAsSoldModel(productId[0].product_id);
    }
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
  getSalesTransactionsModel,
  getSellerID,
  setTransactionStateModel,
  isAvailable,
  getBuyTransactionsModel,
};
