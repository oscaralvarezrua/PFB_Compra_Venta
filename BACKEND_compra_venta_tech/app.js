//Importar dependencias
import express from "express";

const app = express();

//Ruta de prueba con postman
app.get("/", (req, res) => {
  res.send("Todo OK!!!");
});



// Simulando un "banco de dados"
let categorias = [
  { id: 1, name: 'Notebooks' },
  { id: 2, name: 'Smartphones' },
  { id: 3, name: 'Acessórios' }
];

// GET - Listar todas las categorias
app.get('/categorias', async (req, res) => {
  try {
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
});

// GET - Buscar una categoria por ID
app.get('/categorias/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar a categoria' });
  }
});

// POST - Crear nueva categoria
app.post('/categorias', async (req, res) => {
  try {
    const { name } = req.body;

    const novaCategoria = {
      id: categorias.length + 1,
      name
    };

    categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
});

// PUT - Actualizar categoria
app.put('/categorias/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const categoria = categorias.find(c => c.id === id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    categoria.name = name;
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
});

// DELETE - Remover categoria
app.delete('/categorias/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    categorias = categorias.filter(c => c.id !== id);
    res.json({ message: 'Categoria removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover categoria' });
  }
});

app.listen(3000, () => {
  console.log("El servidor está escuchando en el puerto 3000");
});