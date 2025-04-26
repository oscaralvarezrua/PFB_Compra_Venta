// Filtros y Ordenaciones en la lista de productos
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SearchFilteredProducts.css";

//Busqueda y filtrado productos
const SearchFilteredProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Estados para los filtros del formulario
  const [filters, setFilters] = useState({
    name: "",
    locality: "",
    category_id: "",
    min_price: "",
    max_price: "",
    order_by: "",
    order_direction: "asc",
  });

  // Estado para los productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos automáticamente
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/products/search${location.search}`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  // Actualizar formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    navigate(`/searchFilteredProducts?${params.toString()}`);
  };

  return (
    <div className="filtered-products-page">
      <h2 className="title">Buscar productos</h2>

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
          value={filters.min_price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="max_price"
          placeholder="Precio máximo"
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
      </form>

      <h2 className="title">Resultados</h2>
      {loading ? (
        <p className="loading">Cargando productos filtrados...</p>
      ) : products.length === 0 ? (
        <p className="no-results">
          No hay productos que coincidan con los filtros.
        </p>
      ) : (
        <ul className="product-list">
          {products.map((prod) => (
            <li key={prod.id} className="product-item">
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <p>
                {prod.price} € - {prod.locality}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchFilteredProducts;
