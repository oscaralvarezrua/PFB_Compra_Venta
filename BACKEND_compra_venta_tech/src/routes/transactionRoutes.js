//Rutas relacionadas con las transacciones
import {
  initTransactionController,
  getTransactionList,
  setTransactionState,
} from "../controllers/transactionController.js";
import authUserController from "../middlewares/authUserController.js";

import express from "express";

const router = express.Router();

// Iniciar una transacción
router.post("/", authUserController, initTransactionController);

//obtener lista solicitudes de compra
router.get("/", authUserController, getTransactionList);

//Aceptar o rechazar compra
router.patch("/:id", authUserController, setTransactionState);

export default router;
