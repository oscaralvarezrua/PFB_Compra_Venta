import React from 'react';
import './header.css'; 
import logo from "../../assets/logo_negro.png";

const Header = () => {
  const isLoggedIn = false; 

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Buscar" className="search-input"  />
        <button className="search-btn">
          <img src="/src/assets/buscar.png"  />
        </button>
      </div>
      

      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <button>Mi Cuenta</button>
            <button>Salir</button>
          </>
        ) : (
          <>
            <button className="register-button">Regístrate o inicia sesión</button>
          </>
        )}
        <button 
  className="sell-button" 
  onClick={() => window.location.href = '/vender'} > Vender </button>
      </div>
    </header>
  );
};

export default Header;
