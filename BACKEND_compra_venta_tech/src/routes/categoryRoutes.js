import express from "express";
import getCategoryListController from "../controllers/getCategoryListController.js";

const router = express.Router();

// GET - Listar todas las categorias
router.get("/", getCategoryListController);

export default router;

//En principio las categorias ya vendrán dadas desde el principio y solo se tendrán que listar

/*
// GET - Buscar una categoria por ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = categorias.find((c) => c.id === id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    res.json(categoria);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Error al buscar la categoria" });
  }
});

// POST - Crear nueva categoria
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const nuevaCategoria = {
      id: categorias.length + 1,
      name,
    };

    categorias.push(nuevaCategoria);
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Error al crear categoria" });
  }
});

// PUT - Actualizar categoria
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const categoria = categorias.find((c) => c.id === id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }

    categoria.name = name;
    res.json(categoria);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Error al actualizar categoria" });
  }
});

// DELETE - Borrar categoria
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    categorias = categorias.filter((c) => c.id !== id);
    res.json({ message: "Categoria removida con sucesso" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Error al borrar categoria" });
  }
});*/
