import getPool from "./getPool.js";

//Función para iniciar base de datos
const initDB = async () => {
  try {
    //Conexión con la base de datos
    let pool = await getPool();

    console.log("Borrando Tablas...");
    await pool.query(`DROP TABLE IF EXISTS transaction,product,category,user;`);

    console.log("Creando Tablas...");

    //Crear tabla de usuarios
    await pool.query(`
        CREATE TABLE IF NOT EXISTS user (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR (20) NOT NULL UNIQUE,
        email VARCHAR (50) NOT NULL UNIQUE,
        password VARCHAR (100) NOT NULL,
        phone VARCHAR (30) NOT NULL UNIQUE,
        validation_code VARCHAR (150),
        biography TEXT,
        avatar VARCHAR (200),
        role ENUM ("user", "admin") DEFAULT "user",
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW(),
        recovery_code VARCHAR(100) DEFAULT NULL,
        recovery_code_expires DATETIME DEFAULT NULL
        )
        `);

    //Crear tabla de Categorías
    await pool.query(`
      CREATE TABLE IF NOT EXISTS category(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP ON UPDATE NOW()
      )
      `);

    //Iniciar todas las categorias disponibles
    await pool.query(`
  INSERT IGNORE INTO category (name) VALUES
  ('Ordenadores de sobremesa'),
  ('Laptops / Portátiles'),
  ('Tabletas'),
  ('Smartphones'),
  ('Accesorios para computadoras'),
  ('Teclados'),
  ('Ratones'),
  ('Monitores'),
  ('Auriculares / Headsets'),
  ('Cámaras y cámaras de seguridad'),
  ('Dispositivos de almacenamiento'),
  ('Impresoras y escáneres'),
  ('Componentes de PC'),
  ('Dispositivos inteligentes (smart home)'),
  ('Electrónica de consumo')
`);

    //Crear Tabla de Productos
    await pool.query(`
        CREATE TABLE IF NOT EXISTS product(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR (50) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        photo VARCHAR (255) NOT NULL,
        locality VARCHAR (100) NOT NULL,
        is_available BOOLEAN DEFAULT true,
        is_accepted BOOLEAN DEFAULT false,
        user_id INT UNSIGNED NOT NULL,
        category_id INT UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW(),
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
        )
        `);

    //Crear Tabla de Transacciones (compras y ventas)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transaction(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      status ENUM("accepted", "cancelled", "pending"),
      comment TINYTEXT,
      ratings ENUM ("1","2","3","4","5"), 
      user_id INT UNSIGNED NOT NULL,
      product_id INT UNSIGNED NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      update_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES user(id) ,
      FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
      )
      `);

    console.log("Tablas creadas correctamente");
  } catch (e) {
    console.error("Error al crear las tablas", e);
  }
  //Cerrar proceso
  process.exit();
};
initDB();
