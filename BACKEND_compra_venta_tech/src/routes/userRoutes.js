//Rutas relacionadas con la información del usuario

import express from "express";

import { userContoler, validateUserController, userLogin, getUserListController, getUserDetailController, rateSellerController, changePass, getUserInfo, requestPassRecovery, changePassWithRecovery, updateUserContoler, deleteUserController, updateUserAccountController } from "../controllers/userController.js";

import authUserController from "../middlewares/authUserController.js";

const router = express.Router();

// Registro de usuarios
router.post("/register", userContoler);

// Actualizar usuario
router.post("/update", authUserController, updateUserContoler);

// Validacion de usuarios
router.get("/validate/:validationCode", validateUserController);

//Login de usuarios
router.post("/login", userLogin);

// Lista de usuarios
router.get("/", getUserListController);

// Obtener info usuario
router.get("/info", authUserController, getUserInfo);

// Valorar al vendedor
router.post("/rate/:transactionId", rateSellerController);

// Cambio pass
router.put("/password", authUserController, changePass);

// Recuperar pass
router.post("/recover", requestPassRecovery);
router.post("/recover/:recoveryCode", changePassWithRecovery);

// Detalle de usuario con histórico
router.get("/:id", getUserDetailController);

// Boorar usuario
router.delete("/users/:id", authUserController, deleteUserController);

router.post("/account", authUserController, updateUserAccountController);

export default router;
