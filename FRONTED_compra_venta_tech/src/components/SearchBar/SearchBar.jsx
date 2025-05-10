import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Cuando cambie la ruta, si volvemos a Home ('/'), limpiamos el input
  useEffect(() => {
    if (location.pathname === '/') {
      setQuery('');
    }
  }, [location.pathname]);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busca un producto..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <img src="/icons/search.svg" alt="Buscar" />
      </button>
    </form>
  );
};

export default SearchBar;
