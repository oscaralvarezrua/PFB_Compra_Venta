//Interactuar con la base de datos

import getPool from "../db/getPool.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateError } from "../utils/helpers.js";

//Crea nuevos usuarios
const createUser = async (username, email, password, phone, biography = null, avatar = null, validationCode) => {
  try {
    const pool = await getPool();

    //Encriptar la contraseña
    const encriptedPass = await bcrypt.hash(password, 10);

    //Guardar el usuario en la BBDD
    const [result] = await pool.query(
      `INSERT INTO user (username, email, password, phone, biography, avatar, validation_code)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, email, encriptedPass, phone, biography, avatar, validationCode]
    );

    if (!result.insertId) {
      throw generateError("No se pudo crear el usuario", 404);
    }

    return result.insertId;
  } catch (error) {
    console.error("Error creando el usuario: ", error);
    throw generateError("Error al crear el usuario", 404);
  }
};

//Actualizar datos del usuario
const updateUserModel = async (username, phone, biography = null, avatar = null, userID) => {
  try {
    console.log(username, phone, biography, avatar, userID);

    const pool = await getPool();

    //Guardar el usuario en la BBDD
    const [result] = await pool.query(
      `UPDATE user SET username = ?, phone = ?, biography = ?, avatar = ? WHERE id = ?
            `,
      [username, phone, biography, avatar, userID]
    );

    // Verifica si se actualizó algo realmente
    if (result.affectedRows === 0) {
      console.warn("No se modificaron datos: es posible que fueran idénticos.");
      // No lanzamos error, dejamos que continúe
    }

    return result.insertId;
  } catch (error) {
    console.error("Error actualizando el usuario: ", error);
    throw generateError("Error al actualizar el usuario", 404);
  }
};

//Obtener usuario por email
const getUserByEmail = async (email) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM user WHERE email = ?`, [email]);

    return user[0];
  } catch (error) {
    console.error("Error buscando el usuario por email: ", error);
    throw generateError("No se ha encontrado el usuario", 404); //! Da información de que no hay ningún usuario con ese email
  }
};

//Obtener usuario por username
const getUserByUsername = async (username) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM user WHERE username = ?`, [username]);

    return user[0];
  } catch (error) {
    console.error("Error buscando el usuario por username: ", error);
    throw generateError("No se ha encontrado el usuario", 404); //! Da información de que no hay ningún usuario con ese username
  }
};

//Obtener usuario por telefono
const getUserByPhone = async (phone) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM user WHERE phone = ?`, [phone]);

    return user[0];
  } catch (error) {
    console.error("Error buscando el usuario por telefono: ", error);
    throw generateError("No se ha encontrado el usuario", 404); //! Da información de que no hay ningún usuario con ese username
  }
};

//Verifica la contraseña
const trustPass = async (password, encriptedPass) => {
  return await bcrypt.compare(password, encriptedPass);
};

//Validacion de usuario
const userValidation = async (email, validationCode) => {
  try {
    const pool = await getPool();

    //Encontrar y validar
    const [result] = await pool.query(
      `UPDATE user
      SET validation_code = NULL,
      updated_at = NOW()
      WHERE email = ? AND validation_code = ?`,
      [email, validationCode]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error validando el usuario: ", error);
    throw generateError("Usuario inválido", 404);
  }
};

//Obtener usuraio por código de validación
const getUserByValidationCode = async (validationCode) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM user WHERE validation_code = ?`, [validationCode]);

    return user[0];
  } catch (error) {
    console.error("Error obteniendo el usuario: ", error);
    throw generateError("Usuario no encontrado", 404);
  }
};

//Obtener usuario por su id
const getUserById = async (id) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id]);
    return user[0];
  } catch (error) {
    console.error("Error obteniendo el usuario: ", error);
    throw generateError("Usuario no encontrado", 404);
  }
};

//Cambiar la pass
const updatePass = async (userId, newPass) => {
  try {
    const pool = await getPool();

    const encriptedPass = await bcrypt.hash(newPass, 10);

    await pool.query(`UPDATE user SET password = ?, updated_at = NOW() WHERE id = ?`, [encriptedPass, userId]);
  } catch (error) {
    console.error("Error cambiando la contraseña: ", error);
    throw generateError("Contraseña no cambiada", 404);
  }
};

const getUserInf = async (userId) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(
      `SELECT
        id,
        username,
        email,
        phone,
        biography,
        avatar,
        created_at,
        updated_at
      FROM user
      WHERE id = ?`,
      [userId]
    );

    if (!user[0]) {
      generateError("Usuario no encontrado", 401);
    }

    const [stats] = await pool.query(
      `SELECT
COUNT(t.ratings) AS total_ratings,
AVG(t.ratings) AS average_ratings,
COUNT(CASE WHEN t.status = 'accepted' THEN 1 END) AS total_sales,
(SELECT COUNT(*) FROM product WHERE user_id = ?) AS total_products,
(SELECT COUNT(*) FROM transaction WHERE user_id = ? AND status = 'accepted') AS total_purchases
FROM transaction t
WHERE t.seller_id = ?`,
      [userId, userId, userId]
    );

    return {
      ...user[0],
      stats: stats[0],
    };
  } catch (error) {
    console.error("Error consultando la información del usuario: ", error);
    throw generateError("No se ha podido obtener la información de este usuario", 404);
  }
};

//Generar y guardar el código de recuperación
const generateRecoverCode = async (email) => {
  try {
    const pool = await getPool();
    const recoveryCode = crypto.randomBytes(40).toString("hex");

    await pool.query(
      `UPDATE user 
       SET recovery_code = ?, 
           recovery_code_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR)
       WHERE email = ?`,
      [recoveryCode, email]
    );

    return recoveryCode;
  } catch (error) {
    console.error("Error generando código de recuperación:", error);
    throw generateError("Error al generar código de recuperación", 404);
  }
};

//Verificar el código de recuperación
const verifyRecoverCode = async (recoveryCode) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(
      `SELECT * FROM user 
       WHERE recovery_code = ? 
       AND recovery_code_expires > NOW()`,
      [recoveryCode]
    );

    return user[0];
  } catch (error) {
    console.error("Error verificando código de recuperación:", error);
    throw generateError("Error al verificar código de recuperación", 404);
  }
};

//Actualizar la contraseña
const updatePassWithRecovery = async (recoveryCode, newPassword) => {
  try {
    const pool = await getPool();
    const encriptedPass = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE user 
       SET password = ?, 
           recovery_code = NULL, 
           recovery_code_expires = NULL,
           updated_at = NOW()
       WHERE recovery_code = ?`,
      [encriptedPass, recoveryCode]
    );
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    throw generateError("Error al actualizar contraseña", 404);
  }
};

export { createUser, updateUserModel, getUserByEmail, getUserByUsername, trustPass, userValidation, getUserByValidationCode, getUserById, updatePass, getUserInf, getUserByPhone, generateRecoverCode, verifyRecoverCode, updatePassWithRecovery };

// Modelo para obtener la lista de usuarios
export async function getUserListModel() {
  const pool = await getPool();
  const [users] = await pool.query("SELECT id, username, email, avatar FROM user");

  return users;
}

// Modelo para obtener el detalle de un usuario con histórico de ventas y compras
export async function getUserDetailModel(userId) {
  const pool = await getPool();

  const [user] = await pool.query("SELECT id, username, email, biography, avatar FROM user WHERE id = ?", [userId]);

  if (user.length === 0) {
    throw generateError("Usuario no encontrado", 404);
  }
  const [stats] = await pool.query(
    `SELECT
COUNT(t.ratings) AS total_ratings,
AVG(t.ratings) AS average_ratings,
COUNT(CASE WHEN t.status = 'accepted' THEN 1 END) AS total_sales,
(SELECT COUNT(*) FROM product WHERE user_id = ? AND is_available = TRUE) AS total_products,
(SELECT COUNT(*) FROM transaction WHERE user_id = ? AND status = 'accepted') AS total_purchases
FROM transaction t
WHERE t.seller_id = ?`,
    [userId, userId, userId]
  );

  const [productos] = await pool.query(
    `SELECT 
    name,
    price,
    photo
     FROM product 
     WHERE user_id = ? AND is_available = true`,
    [userId]
  );

  const [ventas] = await pool.query(
    `SELECT 
       t.id AS transaccion_id,
       p.name AS producto,
       p.photo AS photo,
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
       p.photo AS photo,
       p.name AS producto,
       t.status,
       t.ratings,
       t.comment,
       t.created_at
     FROM transaction t
     JOIN product p ON t.product_id = p.id
     WHERE t.user_id = ? AND t.status = "accepted"`,
    [userId]
  );

  return {
    usuario: user[0],
    stats: stats,
    historico_ventas: ventas,
    historico_compras: compras,
    productos,
  };
}

// Modelo para valorar a un vendedor si la transacción fue aceptada
export async function rateSellerModel(transactionId, userId, ratings, comment) {
  const pool = await getPool();

  // 1. Verificamos que la transacción exista, sea del usuario y esté aceptada

  const [result] = await pool.query(`SELECT * FROM transaction WHERE id = ? AND user_id = ? AND status = 'aceptada'`, [transactionId, userId]);

  if (result.length === 0) {
    throw generateError("Transacción no válida o aún no aceptada.", 403);
  }

  // 2. Verificamos si ya ha sido valorada
  if (result[0].ratings !== null || result[0].comment !== null) {
    throw generateError("Ya has valorado esta transacción.", 400);
  }

  // 3. Actualizamos con la valoración y comentario

  await pool.query(`UPDATE transaction SET ratings = ?, comment = ? WHERE id = ?`, [ratings, comment, transactionId]);
}

export async function deleteUserModel(id) {
  const pool = await getPool();
  await pool.query("DELETE FROM user WHERE id = ?", [id]);
}

export const updateUserAccountModel = async (userId, email, phone, newPassword) => {
  const pool = await getPool();

  let query = "UPDATE user SET email = ?, phone = ?";
  const values = [email, phone];

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    query += ", password = ?";
    values.push(hashedPassword);
  }

  query += " WHERE id = ?";
  values.push(userId);

  await pool.query(query, values);
};
