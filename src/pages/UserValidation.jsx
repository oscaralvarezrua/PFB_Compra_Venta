import React from "react";
import useValidation from "../hooks/useValidation";
import logo from "../assets/logo_negro_recortado.png";
import "../styles/UserValidation.css";

const UserValidation = () => {
  const { status, message } = useValidation();

  return (
    <main className="validation-container">
      <div className="validation-content">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        {status === "loading" && (
          <div className="validation-message">
            <h2>Validando tu cuenta...</h2>
            <div className="loading-spinner"></div>
          </div>
        )}

        {status === "success" && (
          <div className="validation-message success">
            <h2>¡Validación exitosa!</h2>
            <p>{message}</p>
            <p>Serás redirigido al login en unos segundos...</p>
          </div>
        )}

        {status === "error" && (
          <div className="validation-message error">
            <h2>Error en la validación</h2>
            <p>{message}</p>
            <p>Si el problema persiste, por favor contacta con el soporte técnico.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default UserValidation;
