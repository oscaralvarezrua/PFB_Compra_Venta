import dotenv from "dotenv";
import mysql from "mysql2/promise";

//Leer variables de entorno del ".env"
dotenv.config();
//Desestructurar las variables de entorno desde ".env"
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

//Declarar variable para el pool de conexiones
let pool;

//Función para obtener una conexión de datos
async function getPool() {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
      });
    }
    return await pool;
  } catch (e) {
    console.error(e);
    throw new Error("Problema al obtener la pool");
  }
}
export default getPool;
