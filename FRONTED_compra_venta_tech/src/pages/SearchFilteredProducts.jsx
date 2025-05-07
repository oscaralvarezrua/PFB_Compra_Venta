// Página de Filtros y Ordenaciones de productos
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SearchFilteredProducts.css";
import ApiImage from "../components/Post/ApiImage";

const { VITE_API_URL } = import.meta.env;

const SearchFilteredProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: "",
    locality: "",
    category_id: "",
    min_price: "",
    max_price: "",
    order_by: "",
    order_direction: "asc",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const hasFilters = [...searchParams.entries()].length > 0;

    // Actualizar los filtros con los valores de la URL
    const newFilters = {
      name: searchParams.get("name") || "",
      locality: searchParams.get("locality") || "",
      category_id: searchParams.get("category_id") || "",
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
      order_by: searchParams.get("order_by") || "",
      order_direction: searchParams.get("order_direction") || "asc",
    };
    setFilters(newFilters);

    if (!hasFilters) {
      setProducts([]);
      setFeedback({ message: "", type: "" });
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setFeedback({ message: "", type: "" });

      try {
        const res = await fetch(`${VITE_API_URL}/products/search${location.search}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error al obtener productos");

        if (data.data.length === 0) {
          setProducts([]);
          setFeedback({
            message: "No hay productos que coincidan con los filtros.",
            type: "error",
          });
        } else {
          setProducts(data.data);
          setFeedback({ message: "", type: "" });
        }
      } catch (error) {
        console.error("Error al obtener productos filtrados:", error);
        setFeedback({
          message: "Error al conectar con el servidor. Inténtalo más tarde.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    navigate(`/filtrados?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      locality: "",
      category_id: "",
      min_price: "",
      max_price: "",
      order_by: "",
      order_direction: "asc",
    });
    setProducts([]);
    setFeedback({ message: "", type: "" });
    navigate("/");
  };

  const goToDetail = (id) => {
    navigate(`/producto/${id}`);
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="filtered-products-page">
      <h2 className="title">Buscar productos</h2>

      <form onSubmit={handleSubmit} className="filters-form">
        <input type="text" name="name" placeholder="Nombre del producto" value={filters.name} onChange={handleChange} />
        <input type="text" name="locality" placeholder="Localidad" value={filters.locality} onChange={handleChange} />
        <input type="number" name="min_price" placeholder="Precio mínimo" min="0" value={filters.min_price} onChange={handleChange} />
        <input type="number" name="max_price" placeholder="Precio máximo" min="0" value={filters.max_price} onChange={handleChange} />

        <select name="order_by" value={filters.order_by} onChange={handleChange}>
          <option value="">Ordenar por...</option>
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
          <option value="visits">Más buscados</option>
          <option value="created_at">Novedades</option>
        </select>

        <select name="order_direction" value={filters.order_direction} onChange={handleChange}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <button type="submit">Buscar</button>
        <button type="button" onClick={handleReset} className="reset-button">
          Volver al inicio
        </button>
      </form>

      {feedback.message && <p className={`feedback-message ${feedback.type}`}>{feedback.message}</p>}

      {loading && <p className="loading">Cargando productos...</p>}

      {!loading && (
        <>
          <h2 className="title">Resultados</h2>
          {products.length === 0 ? (
            <p>No hay productos que coincidan con los filtros.</p>
          ) : (
            <div className="results-container">
              <ul className="product-list">
                {products.map((prod) => (
                  <li key={prod.id} className="product-item" onClick={() => goToDetail(prod.id)}>
                    <div className="product-preview">
                      <div className="product-img-wrapper">
                        <ApiImage name={prod.photo} alt={prod.name} />
                      </div>
                      <div className="product-text">
                        <h3>{prod.name}</h3>
                        <p>{prod.description}</p>
                        <p>
                          {prod.price} € - {prod.locality}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchFilteredProducts;
