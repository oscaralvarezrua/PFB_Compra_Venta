//Importar dependencias
import express from "express";
import { error404Controller, errorController } from "./src/middlewares/errorControllers.js";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoutes from "./src/routes/userRoutes.js";

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

app.use("/users", userRoutes);

//Ruta de prueba con postman
app.get("/", (req, res) => {
  res.send("Todo OK!!!");
});

//Middleware al que entra si no parado en un endpoint
app.use(error404Controller);

//Middleware de error.
app.use(errorController);

app.listen(API_PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${API_PORT}`);
});

//Parse del JSON

//Rutas de usuario
app.use("/users", userRoutes);
