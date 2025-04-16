//importamos primero auth luego verificación
import express from "express";
import authUserController from "../middlewares/authUserController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import acceptProductController from "../controllers/acceptProductController.js";
import getProductDetails from "../controllers/getDetailProductController.js";
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

export default router;
