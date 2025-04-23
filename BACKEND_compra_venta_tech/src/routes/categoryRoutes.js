import express from "express";
import getCategoryListController from "../controllers/getCategoryListController.js";

const router = express.Router();

// GET - Listar todas las categorias
router.get("/", getCategoryListController);

export default router;

//Las categorias ya vendrán dadas desde el principio y solo se tendrán que listar
