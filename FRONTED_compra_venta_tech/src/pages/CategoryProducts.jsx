import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import "../styles/CategoryProducts.css";
import ApiImage from "../components/Post/ApiImage";
import { useAuth } from "../hooks/useAuth";

const { VITE_API_URL } = import.meta.env;

export default function CategoryProducts() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const { token } = useAuth();

  // Obtener ids de la query string o del parámetro
  const ids = new URLSearchParams(location.search).get("ids");

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
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);

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

    // Construir la URL con todos los parámetros
    let url = `${VITE_API_URL}/products/search?`;
    if (ids) {
      url += `category_id=${ids}`;
    } else if (id) {
      url += `category_id=${id}`;
    }

    // Añadir el resto de los filtros
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        url += `&${key}=${value}`;
      }
    });
    console.log(url);

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
        if (!data.data || data.data.length === 0) {
          setFeedback({
            message: "No hay productos que coincidan con los filtros.",
            type: "error",
          });
        } else {
          setFeedback({ message: "", type: "" });
        }
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setFeedback({
          message: "Error al conectar con el servidor. Inténtalo más tarde.",
          type: "error",
        });
        setLoading(false);
      });
  }, [location.search, id, ids, token]);

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

    if (ids) {
      params.append("category_id", ids);
    } else if (id) {
      params.append("category_id", id);
    }

    navigate(`/categoria?${params.toString()}`);
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
    setProducts([]);
    setFeedback({ message: "", type: "" });
    navigate("/");
  };

  async function increaseVisit(id) {
    try {
      await fetch(VITE_API_URL + "/products/" + id + "/addvisit", {
        method: "PUT",
      });
      //navigate(`/producto/${id}`);
    } catch (error) {
      console.error("Error al incrementar las visitas:", error);
    }
  }

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="filtered-products-page">
      <h2 className="title">Productos de la categoría</h2>

      <form onSubmit={handleSubmit} className="filters-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={filters.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="locality"
          placeholder="Localidad"
          value={filters.locality}
          onChange={handleChange}
        />
        <input
          type="number"
          name="min_price"
          placeholder="Precio mínimo"
          min="0"
          value={filters.min_price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="max_price"
          placeholder="Precio máximo"
          min="0"
          value={filters.max_price}
          onChange={handleChange}
        />

        <select
          name="order_by"
          value={filters.order_by}
          onChange={handleChange}
        >
          <option value="">Ordenar por...</option>
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
          <option value="visits">Más buscados</option>
          <option value="created_at">Novedades</option>
        </select>

        <select
          name="order_direction"
          value={filters.order_direction}
          onChange={handleChange}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <button type="submit">Buscar</button>
        <button type="button" onClick={handleReset} className="reset-button">
          Volver al inicio
        </button>
      </form>

      {feedback.message && (
        <p className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </p>
      )}

      {loading && <p className="loading">Cargando productos...</p>}

      {!loading && (
        <>
          <h2 className="title">Resultados</h2>
          {products.length === 0 ? (
            <p>No hay productos que coincidan con los filtros.</p>
          ) : (
            <div className="results-grid">
              {products.map((product) => (
                <Link
                  onClick={() => increaseVisit(product.id)}
                  to={`/producto/${product.id}`}
                  key={product.id}
                  className="product-link"
                >
                  <div className="product-card">
                    <ApiImage
                      name={product.photo}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <p className="product-price">{product.price} €</p>
                    <p className="product-location">{product.locality}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
