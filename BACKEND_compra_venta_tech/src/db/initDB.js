import getPool from "./getPool.js";

//Función para iniciar base de datos
const initDB = async () => {
  try {
    //Conexión con la base de datos
    let pool = await getPool();

    console.log("Borrando Tablas...");
    await pool.query(`DROP TABLE IF EXISTS user;`);

    console.log("Creando Tablas...");

    //Crear tabla de usuarios
    await pool.query(`
        CREATE TABLE IF NOT EXISTS user (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR (20) NOT NULL UNIQUE,
        email VARCHAR (50) NOT NULL UNIQUE,
        password VARCHAR (100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW()
        )
        `);

    console.log("Tablas creadas correctamente");
  } catch (e) {
    console.error("Error al crear las tablas");
    //Cerrar proceso
    process.exit();
  }
};
initDB();
