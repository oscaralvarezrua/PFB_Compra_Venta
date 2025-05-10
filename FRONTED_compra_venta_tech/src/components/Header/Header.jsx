// src/components/Header/Header.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import LogoutModal from "../Modals/LogoutModal";

import logo from "../../assets/logo_negro.png";
import buscarIcon from "../../assets/buscar.png";
import "./header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Al cambiar de ruta, si volvemos a Home, limpia el input
  useEffect(() => {
    if (location.pathname === "/") {
      setSearchQuery("");
    }
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const trimmed = searchQuery.trim();
    navigate(trimmed ? `/search?query=${encodeURIComponent(trimmed)}` : "/");
  };

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo SegundaTec" />
        </Link>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Buscar">
            <img src={buscarIcon} alt="" />
          </button>
        </form>

        <div className="auth-buttons">
          {!token ? (
            <>
              <Link to="/register" className="button register-button">
                Regístrate
              </Link>
              <Link to="/login" className="button register-button">
                Inicia sesión
              </Link>
              <Link to="/login" className="button sell-button">
                Vender
              </Link>
            </>
          ) : (
            <>
              {user?.role === "admin" && (
                <div className="admin-dropdown">
                  <Link to="/admin/users" className="button admin-button">
                    Usuarios
                  </Link>
                  <Link to="/admin/products" className="button admin-button">
                    Productos
                  </Link>
                </div>
              )}

              <Link
                to="/user/requests-list"
                className="icon-button notifications-button"
                aria-label="Notificaciones"
              >
                <FaBell />
              </Link>

              <Link
                to="/user"
                className="icon-button profile-button"
                aria-label="Mi perfil"
              >
                <FaUserCircle />
              </Link>

              <Link to="/publicar" className="button sell-button">
                Vender
              </Link>

              <button
                className="button logout-button"
                onClick={() => setIsLogoutModalOpen(true)}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      {isLogoutModalOpen && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
