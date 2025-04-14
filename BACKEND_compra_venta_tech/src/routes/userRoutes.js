//Rutas relacionadas con la información del usuario

import express from "express";
import { userContoler, userValidation, userLogin, getUserListController, getUserDetailController, rateSellerController } from "../controllers/userController.js";

const router = express.Router();

// Registro de usuarios
router.post("/register", userContoler);

// Validacion de usuarios
router.post("/validate/:validationCode", userValidation);

//Login de usuarios
router.post("/login", userLogin);

// Lista de usuarios
router.get("/", getUserListController);

// Detalle de usuario con histórico
router.get("/:id", getUserDetailController);

// Valorar al vendedor
router.post("/rate/:transactionId", rateSellerController);

export default router;
