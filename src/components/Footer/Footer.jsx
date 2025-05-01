import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/logo_negro.png'; 
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top-line"></div>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Logo de SegundaTec" className="logo-img" />
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h3 className="column-title">SegundaTec</h3>
            <ul className="column-list">
              <li>
                <Link to="/quienes-somos" className="footer-link">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="footer-link">
                  Cómo funciona
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="column-title">Soporte</h3>
            <ul className="column-list">
              <li>
                <Link to="/centro-de-ayuda" className="footer-link">
                  Centro de ayuda
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="column-title">Legal</h3>
            <ul className="column-list">
              <li>
                <Link to="/aviso-legal" className="footer-link">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidad" className="footer-link">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/politica-de-cookies" className="footer-link">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;