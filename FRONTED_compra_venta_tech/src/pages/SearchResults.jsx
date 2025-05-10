import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getProducts } from "../services/ProductServices";
import ApiImage from "../components/Post/ApiImage";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const products = await getProducts();
        const filteredResults = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase()));
        setResults(filteredResults);
      } catch (error) {
        console.error("Error al buscar productos:", error);
        setError("Error al cargar los resultados de búsqueda");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) {
    return <div className="search-results-loading">Buscando productos...</div>;
  }

  if (error) {
    return <div className="search-results-error">{error}</div>;
  }

  if (!query) {
    return null;
  }

  return (
    <div className="search-results">
      <h2>Resultados para: "{query}"</h2>
      {results.length === 0 ? (
        <p className="no-results">No se encontraron productos que coincidan con tu búsqueda.</p>
      ) : (
        <div className="results-grid">
          {results.map((product) => (
            <Link to={`/producto/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
                <ApiImage name={product.photo} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="product-price">{product.price} €</p>
                <p className="product-location">{product.locality}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
