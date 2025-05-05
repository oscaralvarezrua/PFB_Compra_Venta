//Rutas relacionadas con las transacciones
import {
  initTransactionController,
  getTransactionList,
  setTransactionState,
  setReviewController,
} from "../controllers/transactionController.js";
import authUserController from "../middlewares/authUserController.js";

import express from "express";

const router = express.Router();

// Iniciar una transacción
router.post("/", authUserController, initTransactionController);

//obtener lista solicitudes de compra (4 tipos, según Vendedor/Comprador o Pendientes / Finalizadas
router.get("/", authUserController, getTransactionList);

//Enviar valoración
router.patch("/review/:id", authUserController, setReviewController);

//Aceptar o rechazar compra
router.patch("/:id", authUserController, setTransactionState);

export default router;
