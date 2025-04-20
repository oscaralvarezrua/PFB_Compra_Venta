//Rutas relacionadas con la información del usuario

import express from "express";
import {
  userContoler,
  validateUserController,
  userLogin,
  getUserListController,
  getUserDetailController,
  rateSellerController,
  changePass,
  getUserInfo,
} from "../controllers/userController.js";
import authUserController from "../middlewares/authUserController.js";

const router = express.Router();

// Registro de usuarios
router.post("/register", userContoler);

// Validacion de usuarios
router.get("/validate/:validationCode", validateUserController);

//Login de usuarios
router.post("/login", userLogin);

// Lista de usuarios
router.get("/", getUserListController);

// Obtener info usuario
router.get("/info", authUserController, getUserInfo);

// Detalle de usuario con histórico
router.get("/:id", getUserDetailController);

// Valorar al vendedor
router.post("/rate/:transactionId", rateSellerController);

// Cambio pass
router.put("/password", authUserController, changePass);

export default router;
