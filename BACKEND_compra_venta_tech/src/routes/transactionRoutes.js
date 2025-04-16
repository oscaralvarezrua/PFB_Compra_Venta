//Rutas relacionadas con las transacciones
import { initTransactionController } from "../controllers/transactionController.js";
import authUserController from "../middlewares/authUserController.js";

import express from "express";

const router = express.Router();

// Registro de usuarios
router.post("/", authUserController, initTransactionController);

export default router;
