// Página de Publicación de Artículos
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/PublishProduct.css";

const { VITE_API_URL } = import.meta.env;

const PublishProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/categories`);
        const data = await res.json();
        setCategories(data.data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) body.append(key, val);
    });

    try {
      const res = await fetch(`${VITE_API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSubmitMessage(
        "¡Producto publicado correctamente! ✅ Pronto un Administrador revisará su producto y, una vez aprobada, estará disponible para la venta."
      );
      setFormData({
        name: "",
        description: "",
        price: "",
        locality: "",
        category_id: "",
        photo: null,
      });
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setSubmitMessage(err.message || "Error al conectar con el servidor.");
    }
  };

  return (
    <section className="publish-wrapper">
      <h2 className="page-title">Publicar nuevo artículo</h2>

      <form
        id="publish-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="publish-form"
      >
        <div className="form-sections">
          <div className="info-box">
            <h3>Información del producto</h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
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
          </div>

          <div className="photo-box">
            <h3>Foto del producto</h3>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              ref={fileInputRef}
              required
            />
            {preview && (
              <img src={preview} alt="preview" className="photo-preview" />
            )}
          </div>
        </div>

        {submitMessage && (
          <p
            className={`feedback-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </p>
        )}
      </form>

      <div className="publish-buttons">
        <button type="submit" form="publish-form">
          Publicar artículo
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="reset-button"
        >
          Volver al inicio
        </button>
      </div>
    </section>
  );
};

export default PublishProduct;
