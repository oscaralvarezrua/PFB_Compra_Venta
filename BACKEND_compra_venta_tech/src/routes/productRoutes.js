//importamos primero auth luego verificación
import express from "express";
import authUserController from "../middlewares/authUserController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import acceptProductController from "../controllers/acceptProductController.js";
import {
  getProductDetails,
  getAcceptProductListController,
  deleteProductController,
  setProtucdAsSoldController,
} from "../controllers/productController.js";
import publishProductController from "../controllers/publishProductController.js";

const router = express.Router();

// Ruta para aceptar producto
router.put(
  "/:id/accept",
  authUserController,
  checkAdmin,
  acceptProductController
);
//Ruta para detalle de producto
router.get("/:id", getProductDetails);

//Ruta para publicar un nuevo producto
router.post("/", authUserController, publishProductController);

//Marcar como vendido un producto
router.patch("/:id/sold", authUserController, setProtucdAsSoldController);

export default router;

// Lista de articulos
// Simulando um "banco de dados" de articulos
// let articulos = [
//   {
//     id: 1,
//     nombre: "Notebook Dell",
//     descripcion: "Notebook com 16GB RAM e SSD 512GB",
//     precio: 3500,
//     categoriaId: 1,
//   },
//   {
//     id: 2,
//     nombre: "iPhone 13",
//     descripcion: "Celular Apple com câmera dupla e 128GB",
//     precio: 4500,
//     categoriaId: 2,
//   },
// ];

// GET - Listar todos los articulos
router.get("/", getAcceptProductListController);

// GET - Buscar um articulos por ID
router.get("/:id", getProductDetails);

// POST - Crear nuevo articulo
// router.post("/", async (req, res) => {
//   try {
//     const { nombre, descripcion, precio, categoriaId } = req.body;

//     const nuevoArticulo = {
//       id: articulos.length + 1,
//       nombre,
//       descripcion,
//       precio,
//       categoriaId,
//     };

//     articulos.push(nuevoArticulo);
//     res.status(201).json(nuevoArticulo);
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({ message: "Error al crear articulo" });
//   }
// });

// PUT - Atualizar um artigo
router.put("/:id", async (req, res) => {
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
    console.error(err);

    res.status(500).json({ message: "Erroe al actualizar el articulo" });
  }
});

// DELETE - Borrar articulos
router.delete("/:id", deleteProductController);
