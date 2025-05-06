import React from "react";
import "./LogoutModal.css";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>¿Estás seguro de que quieres cerrar sesión?</h3>
        <div className="modal-buttons">
          <button className="confirm" onClick={onConfirm}>
            Sí, cerrar sesión
          </button>
          <button className="cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
