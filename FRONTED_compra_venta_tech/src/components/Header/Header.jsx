// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo_negro.png";
import buscarIcon from "../../assets/buscar.png";
import notificationIcon from "../../assets/notification.png";  // <— tu icono
import userIcon from "../../assets/user.png";   
import { useAuth } from "../../contexts/AuthContext";
import LogoutModal from "../Modals/LogoutModal";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token, logout, user } = useAuth();

  const handleSearchChange = e => setSearchQuery(e.target.value);
  const handleSearchSubmit = e => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/search?query=${searchQuery}` : "/");
  };
  const handleKeyPress = e => e.key === "Enter" && handleSearchSubmit(e);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const confirmLogout   = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/");
  };
  const cancelLogout    = () => setIsLogoutModalOpen(false);

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" className="logo-img" /></Link>
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
                <button className="notifications-button">
                  <img src={notificationIcon} alt="Notificaciones" className="icon-button" />
                </button>
              </Link>

              <Link to="/user">
                <button className="profile-button">
                  <img src={userIcon} alt="Mi perfil" className="icon-button" />
                </button>
              </Link>

              <Link to="/publicar">
                <button className="sell-button">Vender</button>
              </Link>

              <button className="logout-button" onClick={openLogoutModal}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      {isLogoutModalOpen && (
        <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </>
  );
};

export default Header;