//Importar dependencias
import express from "express";
import {
  error404Controller,
  errorController,
} from "./src/middlewares/errorControllers.js";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";

// Importamos las variables de entorno necesarias.
const { API_PORT, UPLOADS_DIR } = process.env;

const app = express();
app.use(express.json()); //! NO TOCAR ESTA LINEA :)

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que muestra por consola info sobre la petición entrante.
app.use(morgan("dev"));

// Middleware que permite leer un body en formato "form-data" (para archivos).
app.use(fileUpload());

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR));

//Rutas a postman

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);

//Middleware al que entra si no parado en un endpoint
app.use(error404Controller);

//Middleware de error.
app.use(errorController);

// Simulando un "banco de dados"
let categorias = [
  { id: 1, name: "Notebooks" },
  { id: 2, name: "Smartphones" },
  { id: 3, name: "Acessórios" },
];

// GET - Listar todas las categorias
app.get("/categorias", async (req, res) => {
  try {
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar categorias" });
  }
});

// GET - Buscar una categoria por ID
app.get("/categorias/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = categorias.find((c) => c.id === id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar la categoria" });
  }
});

// POST - Crear nueva categoria
app.post("/categorias", async (req, res) => {
  try {
    const { name } = req.body;

    const nuevaCategoria = {
      id: categorias.length + 1,
      name,
    };

    categorias.push(nuevaCategoria);
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(500).json({ message: "Error al crear categoria" });
  }
});

// PUT - Actualizar categoria
app.put("/categorias/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const categoria = categorias.find((c) => c.id === id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    categoria.name = name;
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar categoria" });
  }
});

// DELETE - Borrar categoria
app.delete("/categorias/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    categorias = categorias.filter((c) => c.id !== id);
    res.json({ message: "Categoria removida con sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Error al borrar categoria" });
  }
});

// Lista de articulos
// Simulando um "banco de dados" de articulos
let articulos = [
  {
    id: 1,
    nombre: "Notebook Dell",
    descripcion: "Notebook com 16GB RAM e SSD 512GB",
    precio: 3500,
    categoriaId: 1,
  },
  {
    id: 2,
    nombre: "iPhone 13",
    descripcion: "Celular Apple com câmera dupla e 128GB",
    precio: 4500,
    categoriaId: 2,
  },
];

// GET - Listar todos los articulos
app.get("/articulos", async (req, res) => {
  try {
    res.json(articulos);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar los articulos" });
  }
});

// GET - Buscar um articulos por ID
app.get("/articulos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const articulo = articulos.find((a) => a.id === id);

    if (!articulo) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.json(articulo);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar el articulo" });
  }
});

// POST - Crear nuevo articulo
app.post("/articulos", async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoriaId } = req.body;

    const nuevoArticulo = {
      id: articulos.length + 1,
      nombre,
      descripcion,
      precio,
      categoriaId,
    };

    articulos.push(nuevoArticulo);
    res.status(201).json(nuevoArticulo);
  } catch (err) {
    res.status(500).json({ message: "Error al crear articulo" });
  }
});

// PUT - Atualizar um artigo
app.put("/articulos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, categoriaId } = req.body;

    const articulo = articulos.find((a) => a.id === id);
    if (!articulo) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    articulo.nombre = nombre;
    articulo.descripcion = descripcion;
    articulo.precio = precio;
    articulo.categoriaId = categoriaId;

    res.json(articulo);
  } catch (err) {
    res.status(500).json({ message: "Erroe al actualizar el articulo" });
  }
});

// DELETE - Borrar articulos
app.delete("/articulos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    articulos = articulos.filter((a) => a.id !== id);
    res.json({ message: "Articulo borrado con suceso" });
  } catch (err) {
    res.status(500).json({ message: "Error al borrar el articulo" });
  }
});

app.listen(API_PORT, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});
