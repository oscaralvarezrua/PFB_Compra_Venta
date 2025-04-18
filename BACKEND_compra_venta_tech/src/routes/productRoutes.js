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
import { updateProductController } from "../controllers/updateProductController.js";

const router = express.Router();

// Ruta para aceptar producto
router.put(
  "/:id/accept",
  authUserController,
  checkAdmin,
  acceptProductController
);

//Ruta para actualizar un producto
router.put("/:id", authUserController, updateProductController);

//Ruta para detalle de producto
router.get("/:id", getProductDetails);

//Ruta para publicar un nuevo producto
router.post("/", authUserController, publishProductController);

//Ruta para Marcar como vendido un producto
router.patch("/:id/sold", authUserController, setProtucdAsSoldController);

// Ruta productos aceptados
router.get("/", getAcceptProductListController);

//Ruta para eliminar producto
router.delete("/:id", authUserController, deleteProductController);

export default router;
