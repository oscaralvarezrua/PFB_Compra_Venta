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

//Middleware al que entra si no parado en un endpoint
app.use(error404Controller);

//Middleware de error.
app.use(errorController);

// Simulando un "banco de dados"
let categorias = [
  { id: 1, name: 'Notebooks' },
  { id: 2, name: 'Smartphones' },
  { id: 3, name: 'Acessórios' }
];

// GET - Listar todas las categorias
app.get('/categorias', async (req, res) => {
  try {
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
});

// GET - Buscar una categoria por ID
app.get('/categorias/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar a categoria' });
  }
});

// POST - Crear nueva categoria
app.post('/categorias', async (req, res) => {
  try {
    const { name } = req.body;

    const novaCategoria = {
      id: categorias.length + 1,
      name
    };

    categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
});

// PUT - Actualizar categoria
app.put('/categorias/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const categoria = categorias.find(c => c.id === id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    categoria.name = name;
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
});

// DELETE - Remover categoria
app.delete('/categorias/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    categorias = categorias.filter(c => c.id !== id);
    res.json({ message: 'Categoria removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover categoria' });
  }
});

app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});


