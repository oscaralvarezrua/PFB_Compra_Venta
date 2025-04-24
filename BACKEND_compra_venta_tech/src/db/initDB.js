import getPool from "./getPool.js";

const initDB = async () => {
  try {
    const pool = await getPool();

    console.log("Borrando tablas...");

    await pool.query(
      `DROP TABLE IF EXISTS transaction, product, category, user;`
    );

    console.log("Creando tablas...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(30) NOT NULL UNIQUE,
        validation_code VARCHAR(150),
        biography TEXT,
        avatar VARCHAR(200),
        role ENUM("user", "admin") DEFAULT "user",
        recovery_code VARCHAR(100) DEFAULT NULL,
        recovery_code_expires DATETIME DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW()
        )
        `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS category (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        parent_id INT UNSIGNED DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW(),
        FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE SET NULL
      )
    `);

    //Categorías padre
    await pool.query(`
      INSERT INTO category (name) VALUES
      ('Informática'),
      ('Electrónica'),
      ('Telefonía'),
      ('Gamer'),
      ('Hogar')`);

    // Subcategorías
    await pool.query(`
    INSERT INTO category (name, parent_id)
    VALUES
      ('Ordenadores de sobremesa', 1),
  ('Portátiles / Laptops', 1),
  ('Componentes (CPU, RAM, GPU, etc.)', 1),
  ('Periféricos (ratón, teclado, impresora)', 1),
  ('Dispositivos de almacenamiento (HDD, SSD, USB)', 1),
  ('Software y licencias', 1),
  ('Redes y routers', 1),

  ('Televisores y monitores', 2),
  ('Cámaras y fotografía', 2),
  ('Equipos de sonido', 2),
  ('Smartwatches y wearables', 2),
  ('Dispositivos inteligentes (domótica)', 2),
  ('Reproductores multimedia', 2),
  ('Proyectores', 2),

  ('Smartphones', 3),
  ('Teléfonos fijos', 3),
  ('Accesorios (fundas, cargadores, protectores)', 3),
  ('Smartbands', 3),
  ('Baterías externas (power banks)', 3),
  ('Tarjetas SIM / prepago', 3),

  ('Consolas (PS5, Xbox, Nintendo)', 4),
  ('Juegos físicos y digitales', 4),
  ('Accesorios gaming (volantes, mandos, headsets)', 4),
  ('Sillas gamer', 4),
  ('PCs gaming', 4),
  ('Tarjetas gráficas', 4),
  ('Teclados y ratones RGB', 4),

  ('Robots aspiradores', 5),
  ('Asistentes virtuales (Alexa, Google Home)', 5),
  ('Electrodomésticos pequeños (freidoras, batidoras tech)', 5),
  ('Cámaras de seguridad', 5),
  ('Termostatos inteligentes', 5),
  ('Bombillas y enchufes inteligentes', 5),
  ('Paneles solares / cargadores inteligentes', 5)`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS product (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        photo VARCHAR(255) NOT NULL,
        locality VARCHAR(100) NOT NULL,
        is_available BOOLEAN DEFAULT true,
        is_accepted BOOLEAN DEFAULT false,
        user_id INT UNSIGNED NOT NULL,
        category_id INT UNSIGNED NOT NULL,
        visits INT UNSIGNED DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW(),
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS transaction (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        status ENUM("accepted", "cancelled", "pending"),
        comment TINYTEXT,
        ratings ENUM("1", "2", "3", "4", "5"),
        user_id INT UNSIGNED NOT NULL,
        product_id INT UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        update_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
      )
    `);

    console.log("Tablas creadas correctamente.");
  } catch (e) {
    console.error("Error al crear las tablas:", e);
  }

  process.exit();
};

initDB();
