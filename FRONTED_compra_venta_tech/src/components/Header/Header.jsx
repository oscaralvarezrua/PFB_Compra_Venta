import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo_negro.png";
import buscarIcon from "../../assets/buscar.png";

import { useAuth } from "../../contexts/AuthContext";

// >>> MODAL LOGOUT
import LogoutModal from "../Modals/LogoutModal";
// <<<

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  // >>> MODAL LOGOUT
  const [showModal, setShowModal] = useState(false);
  const confirmLogout = () => {
    logout();
    navigate("/");
    setShowModal(false);
  };
  // <<<

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <>
      <header className="header">
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
              <Link to="/user/requests-list">
                <button className="notifications-button">Notificaciones</button>
              </Link>
              <Link to="/user">
                <button className="profile-button">Mi perfil</button>
              </Link>
              <Link to="/publicar">
                <button className="sell-button">Vender</button>
              </Link>
              {/* >>> MODAL LOGOUT */}
              <button
                className="logout-button"
                onClick={() => setShowModal(true)}
              >
                Cerrar sesión
              </button>
              {/* <<< */}
            </>
          )}
        </div>
      </header>

      {/* >>> MODAL LOGOUT */}
      {showModal && (
        <LogoutModal
          onConfirm={confirmLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
      {/* <<< */}
    </>
  );
};

export default Header;
