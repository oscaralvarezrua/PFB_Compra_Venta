// Página de publicación artículo
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Necesario para el botón Volver
import { useAuth } from "../hooks/useAuth";
import "../styles/PublishProduct.css";

const PublishProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate(); // ✅

  const fileInputRef = useRef(null); // Para limpiar el input de tipo file

  // Estados
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    locality: "",
    category_id: "",
    photo: null,
  });

  const [categories, setCategories] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");

  // Cargar categorías
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

  // Cambios en los inputs
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Enviar formulario
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
        setSubmitMessage(data.message || "Algo ha fallado, lo sentimos.");
      } else {
        setSubmitMessage("¡Producto publicado correctamente! ✅");

        // Limpiar formulario
        setFormData({
          name: "",
          description: "",
          price: "",
          locality: "",
          category_id: "",
          photo: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setSubmitMessage("Error al conectar con el servidor.");
    }
  };

  // Botón volver al inicio
  const handleReset = () => {
    navigate("/");
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
          min="0"
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

        <div className="file-input-wrapper">
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            ref={fileInputRef}
            required
          />
          {formData.photo && (
            <button
              type="button"
              className="delete-file-btn"
              onClick={() => {
                setFormData({ ...formData, photo: null });
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              X
            </button>
          )}
        </div>

        <button type="submit">Publicar artículo</button>
        <button type="button" onClick={handleReset} className="reset-button">
          Volver al inicio
        </button>
      </form>

      {submitMessage && (
        <p
          className={`feedback-message ${
            submitMessage.includes("✅") ? "success" : "error"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default PublishProduct;
