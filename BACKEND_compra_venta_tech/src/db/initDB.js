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
        updated_at TIMESTAMP ON UPDATE NOW(),
        recovery_code VARCHAR(100) DEFAULT NULL,
        recovery_code_expires DATETIME DEFAULT NULL
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

    // Insertar categorías padre
    await pool.query(`
      INSERT INTO category (name) VALUES 
        ('Ordenadores'),
        ('Móviles y Tablets'),
        ('Accesorios'),
        ('Imagen y Sonido'),
        ('Otros')
    `);

    // Obtener IDs de las categorías padre
    const [categories] = await pool.query(`SELECT id, name FROM category`);
    const getParentId = (name) =>
      categories.find((cat) => cat.name === name)?.id;

    // Subcategorías
    const subcategories = [
      ["Ordenadores de sobremesa", "Ordenadores"],
      ["Laptops / Portátiles", "Ordenadores"],
      ["Componentes de PC", "Ordenadores"],
      ["Tabletas", "Móviles y Tablets"],
      ["Móviles / Smartphones", "Móviles y Tablets"],
      ["Teclados", "Accesorios"],
      ["Ratones", "Accesorios"],
      ["Cables y adaptadores", "Accesorios"],
      ["Redes y routers", "Accesorios"],
      ["Auriculares / Headsets", "Imagen y Sonido"],
      ["Monitores y televisores", "Imagen y Sonido"],
      ["Cámaras y cámaras de seguridad", "Imagen y Sonido"],
      ["Electrónica de consumo", "Imagen y Sonido"],
      ["Consolas y videojuegos", "Imagen y Sonido"],
      ["Relojes inteligentes y wearables", "Imagen y Sonido"],
      ["Dispositivos de almacenamiento", "Accesorios"],
      ["Impresoras y escáneres", "Accesorios"],
      ["Dispositivos inteligentes (smart home)", "Accesorios"],
    ];

    for (const [name, parent] of subcategories) {
      await pool.query(`INSERT INTO category (name, parent_id) VALUES (?, ?)`, [
        name,
        getParentId(parent),
      ]);
    }

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
