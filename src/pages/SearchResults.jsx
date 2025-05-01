import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si no hay query en la URL, no hacemos nada
    if (!query) {
      setResults([]);  // Limpiamos los resultados si no hay búsqueda
      return;
    }

    setIsLoading(true);
    // Simulación de búsqueda (esto debe ser reemplazado con una búsqueda real)
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: "Artículo 1", description: "Descripción del artículo 1" },
        { id: 2, title: "Artículo 2", description: "Descripción del artículo 2" },
      ];
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  }, [query]);  // Dependencia de query para actualizar los resultados

  if (isLoading) {
    return <p>Cargando resultados...</p>;
  }

  // Si no hay búsqueda, no mostramos los resultados ni el mensaje
  if (!query) {
    return null;
  }

  return (
    <div className="search-results">
      <h2>Resultados para: "{query}"</h2>
      {results.length === 0 ? (
        <p>No se encontraron coincidencias.</p>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id} className="search-result-item">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;


