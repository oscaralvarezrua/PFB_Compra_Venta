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
        recovery_code VARCHAR(100) DEFAULT NULL,
        recovery_code_expires DATETIME DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW()
        )
        `);

    // Tabla categorías con jerarquía
    await pool.query(`
      CREATE TABLE IF NOT EXISTS category (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        parent_id INT UNSIGNED DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP ON UPDATE NOW(),
        FOREIGN KEY (parent_id) REFERENCES category(id) ON DELETE SET NULL
      );
    `);

    // Insertar categorías principales
    await pool.query(`
      INSERT INTO category (name) VALUES
      ('Informática'),
      ('Electrónica'),
      ('Telefonía'),
      ('Gamer'),
      ('Hogar')
    `);

    // Obtener los IDs de categorías padre
    const [parents] = await pool.query(`SELECT id, name FROM category`);

    const getParentId = (name) => {
      const cat = parents.find((c) => c.name === name);
      return cat ? cat.id : null;
    };

    // Subcategorías organizadas
    const subcategories = [
      ["Portátiles", "Informática"],
      ["Ordenadores de sobremesa", "Informática"],
      ["Teclados", "Informática"],
      ["Ratones", "Informática"],
      ["Impresoras", "Informática"],
      ["Monitores", "Electrónica"],
      ["Auriculares", "Electrónica"],
      ["Cámaras", "Electrónica"],
      ["Smartphones", "Telefonía"],
      ["Relojes inteligentes", "Telefonía"],
      ["Consolas", "Gamer"],
      ["Videojuegos", "Gamer"],
      ["Domótica", "Hogar"],
      ["Sonido", "Hogar"],
    ];

    for (const [name, parent] of subcategories) {
      await pool.query(`INSERT INTO category (name, parent_id) VALUES (?, ?)`, [
        name,
        getParentId(parent),
      ]);
    }

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
