import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SearchResults.css";
import ApiImage from "../components/Post/ApiImage";

const { VITE_API_URL } = import.meta.env;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  // Estado para los filtros
  const [filters, setFilters] = useState({
    name: "",
    locality: "",
    min_price: "",
    max_price: "",
    order_by: "",
    order_direction: "asc",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    // Actualizar los filtros con los valores de la URL
    const newFilters = {
      name: searchParams.get("name") || "",
      locality: searchParams.get("locality") || "",
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
      order_by: searchParams.get("order_by") || "",
      order_direction: searchParams.get("order_direction") || "asc",
    };
    setFilters(newFilters);

    if (!query) {
      setProducts([]);
      setFeedback({ message: "", type: "" });
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setFeedback({ message: "", type: "" });

      try {
        // Construir la URL con todos los parámetros
        let url = `${VITE_API_URL}/products/search?query=${query}`;
        Object.entries(newFilters).forEach(([key, value]) => {
          if (value) {
            url += `&${key}=${value}`;
          }
        });

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error al obtener productos");

        if (data.data.length === 0) {
          setProducts([]);
          setFeedback({
            message: "No hay productos que coincidan con la búsqueda.",
            type: "error",
          });
        } else {
          setProducts(data.data);
          setFeedback({ message: "", type: "" });
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
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
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const params = new URLSearchParams();

    // Mantener el término de búsqueda original
    if (query) params.append("query", query);

    // Añadir los filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    navigate(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      locality: "",
      min_price: "",
      max_price: "",
      order_by: "",
      order_direction: "asc",
    });
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      navigate(`/search?query=${query}`);
    } else {
      navigate("/");
    }
  };

  const goToDetail = (id) => {
    navigate(`/producto/${id}`);
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="filtered-products-page">
      <h2 className="title">Resultados de búsqueda</h2>

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

        <button type="submit">Aplicar filtros</button>
        <button type="button" onClick={handleReset} className="reset-button">
          Limpiar filtros
        </button>
      </form>

      {feedback.message && <p className={`feedback-message ${feedback.type}`}>{feedback.message}</p>}

      {loading && <p className="loading">Cargando productos...</p>}

      {!loading && (
        <>
          <h2 className="title">Resultados</h2>
          {products.length === 0 ? (
            <p>No hay productos que coincidan con la búsqueda.</p>
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

export default SearchResults;
