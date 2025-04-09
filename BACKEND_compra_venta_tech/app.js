//Importar dependencias
import express from "express";

const app = express();

//Ruta de prueba con postman
app.get("/", (req, res) => {
  res.send("Todo OK!!!");
});

app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});
