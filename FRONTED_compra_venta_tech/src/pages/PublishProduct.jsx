import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import "./PublishProduct.css";

const PublishProduct = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    locality: "",
    category_id: "",
    photo: null,
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = new FormData();
    for (const key in formData) {
      body.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Algo ha fallado 😢");
      } else {
        setMessage("¡Producto publicado correctamente! ✅");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="publish-page">
      <h2>Publicar un nuevo artículo</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Nombre del artículo"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Precio (€)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="locality"
          placeholder="Localidad"
          value={formData.locality}
          onChange={handleChange}
          required
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" name="photo" onChange={handleChange} required />

        <button type="submit">Publicar artículo</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PublishProduct;
