import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo_negro.png";
import { useAuth } from "../../contexts/AuthContext";
import notification from "../../assets/notification.png";
import user from "../../assets/user.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

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
      {token ? (
        <div className="auth-buttons">
          <Link to="/user/notification">
            <button className="notification-button">
              Notificaciones
              {/* <img src={notification} /> */}
            </button>
          </Link>
          <Link to="/user">
            <button className="user-button">
              Mi Perfil
              {/* <img src={user} /> */}
            </button>
          </Link>

          <Link to="/publicar">
            <button className="sell-button">Vender</button>
          </Link>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/register">
            <button className="register-button">Regístrate</button>
          </Link>
          <Link to="/login">
            <button className="register-button">Inicia sesión</button>
          </Link>

          <Link to="/login">
            <button className="sell-button">Vender</button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
