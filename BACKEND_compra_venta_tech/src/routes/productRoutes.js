//importamos primero auth luego verificación
import express from "express";
import authUserController from "../middlewares/authUserController.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import { acceptProductController, noAcceptProductController } from "../controllers/acceptProductController.js";
import { getProductDetails, getProductListController, deleteProductController, setProtucdAsSoldController, addVisitProductController, getUserProductListController, rejectProductController } from "../controllers/productController.js";
import { publishProductController, updateProductController } from "../controllers/publish&updateProductController.js";
import { getFilteredProductsController } from "../controllers/getFilteredProductsController.js";
import checkOptionalAuth from "../middlewares/checkOptionalAuth.js";

const router = express.Router();

// Ruta para aceptar producto (Admin)
router.put("/:id/accept", authUserController, checkAdmin, acceptProductController);

//cuando editamos un producto para a revisión de nuevo
router.put("/:id/no-accept", authUserController, noAcceptProductController);

//Ruta para filtros de búsqueda
router.get("/search", checkOptionalAuth, getFilteredProductsController);

//Ruta para obtener todos los productos del usuario
router.get("/list/:id", authUserController, getUserProductListController);

// Ruta para visualizar Lista de productos aceptados
router.get("/", checkOptionalAuth, getProductListController);

//Ruta para publicar un nuevo producto
router.post("/", authUserController, publishProductController);

//Ruta para actualizar un producto
router.put("/:id", authUserController, updateProductController);

//Ruta para incrementar visitas del producto
router.put("/:id/addvisit", addVisitProductController);

//Ruta para Marcar como vendido un producto
router.patch("/:id/sold", authUserController, setProtucdAsSoldController);

// Ruta para rechazar un producto (Admin)
router.delete("/:id/reject", authUserController, checkAdmin, rejectProductController);

//Ruta para eliminar producto
router.delete("/:id", authUserController, deleteProductController);

//Ruta para detalle de producto
router.get("/:id", getProductDetails);

export default router;
