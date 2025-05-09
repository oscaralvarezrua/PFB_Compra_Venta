import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SearchResults.css";

const { VITE_API_URL } = import.meta.env;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    if (!query) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/products/search?query=${query}`);
        const data = await res.json();

        if (res.ok) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error cargando productos:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const goToDetail = (id) => navigate(`/producto/${id}`);

  if (loading) return <p className="search-results-loading">Cargando productos...</p>;

  return (
    <div className="search-results">
      <h2>Resultados de búsqueda</h2>
      <div className="results-grid">
        {products.map((prod) => (
          <div key={prod.id} className="product-card" onClick={() => goToDetail(prod.id)}>
            <div className="product-image-wrapper">
              <img src={`${VITE_API_URL}/uploads/${prod.photo}`} alt={prod.name} />
            </div>
            <div className="product-info">
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <p className="product-price">{prod.price} €</p>
              <p>📍 {prod.locality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;