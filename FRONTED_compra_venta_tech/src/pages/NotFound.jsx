//Página “Not Found” (React Router Dom)
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const message = "La página que buscas no existe.";
  const messageType = "error"; // Opcional

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Lo sentimos... página no encontrada!</p>

      {/* Feedback */}
      {message && (
        <p className={`feedback-message ${messageType}`}>{message}</p>
      )}

      <Link to="/" className="home-link">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
