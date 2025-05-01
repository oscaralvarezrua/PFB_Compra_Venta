import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo_negro.png";

import { useAuth } from "../../contexts/AuthContext";
//import notification from "../../assets/notification.png";
//import user from "../../assets/user.png";

import buscarIcon from "../../assets/buscar.png"; // Importa la imagen de búsqueda

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Usamos el contexto de autenticación
  const { token, logout } = useAuth(); // Obtenemos el estado del usuario desde el contexto

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
    <header className="header">
      {" "}
      {/* Asegúrate de tener esta clase en el header */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar" className="search-input" value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
        <button className="search-btn" onClick={handleSearchSubmit}>
          <img src={buscarIcon} alt="Buscar" /> {/* Usa la imagen importada */}
        </button>
      </div>
      <div className="auth-buttons">
        {!token ? (
          <>
            <Link to="/register">
              <button className="register-button">Regístrate</button>
            </Link>
            <Link to="/login">
              <button className="register-button">Inicia sesión</button>
            </Link>

            <Link to="/login">
              <button className="sell-button">Vender</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/notifications">
              <button className="notifications-button">Notificaciones</button>
            </Link>
            <Link to="/favorites">
              <button className="favorites-button">Favoritos</button>
            </Link>
            <Link to="/user">
              <button className="profile-button">Mi perfil</button>
            </Link>
            <Link to="/publicar">
              <button className="sell-button">Vender</button>
            </Link>
            <button className="logout-button" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
