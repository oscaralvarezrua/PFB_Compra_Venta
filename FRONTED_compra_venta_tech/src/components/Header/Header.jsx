import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo_negro.png";

import { useAuth } from "../../contexts/AuthContext";
import buscarIcon from "../../assets/buscar.png"; // Importa la imagen de búsqueda

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { token, logout, user } = useAuth(); // Añadido user

  // Cambios en el input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Enviar formulario
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  // Enter en input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar" className="search-input" value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
        <button className="search-btn" onClick={handleSearchSubmit}>
          <img src={buscarIcon} alt="Buscar" />
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
            {user?.role === "admin" && (
              <div className="admin-dropdown">
                <Link to="/admin/users">
                  <button className="usuarios-button">Usuarios</button>
                </Link>
                <Link to="/admin/products">
                  <button className="productos-button">Productos</button>
                </Link>
              </div>
            )}
            <Link to="/user/requests-list">
              <button className="notifications-button">Notificaciones</button>
            </Link>
            <Link to="/user">
              <button className="profile-button">Mi perfil</button>
            </Link>
            <Link to="/publicar">
              <button className="sell-button">Vender</button>
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
