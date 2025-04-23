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
        {/* Aquí ajustar la lógica para usar autenticación real */}
        <button className="register-button">
          Regístrate o inicia sesión
        </button>
        <button
          className="sell-button"
          onClick={() => (window.location.href = "/vender")}
        >
          Vender
        </button>
      </div>
    </header>
  );
};

export default Header;
