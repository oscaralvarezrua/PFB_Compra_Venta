import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo_negro.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Cambios en el input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      navigate("/");
    }
  };

  // Enviar formulario
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Enter en input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearchSubmit}>
          <img src="/src/assets/buscar.png" alt="Buscar" />
        </button>
      </div>

      <div className="auth-buttons">
        <Link to="/login">
          <button className="register-button">
            Regístrate o inicia sesión
          </button>
        </Link>

        <Link to="/register">
          <button className="sell-button">Vender</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
