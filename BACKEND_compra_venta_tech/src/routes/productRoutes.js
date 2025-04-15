//importamos primero auth luego verificación
import express from "express";
import authUserController from "../middlewares/authUserController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import acceptProductController from "../controllers/acceptProductController.js";

const router = express.Router();

// Ruta para aceptar producto
router.put(
  "/:id/accept",
  authUserController,
  checkAdmin,
  acceptProductController
);

export default router;
