//Rutas relacionadas con la información del usuario

import express from "express";
import { getUserListController, getUserDetailController } from "../controllers/userControllers.js";

const router = express.Router();

// Lista de usuarios
router.get("/", getUserListController);

// Detalle de usuario con histórico
router.get("/:id", getUserDetailController);

export default router;
