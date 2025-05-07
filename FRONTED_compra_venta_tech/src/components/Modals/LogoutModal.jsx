// src/components/LogoutModal.jsx
import React, { useEffect, useRef } from "react";

const LogoutModal = ({ onConfirm, onCancel }) => {
  const overlayRef = useRef();

  // Cerrar con Esc
  useEffect(() => {
    const listener = e => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [onCancel]);

  // Click fuera del modal-box
  const handleOverlayClick = e => {
    if (e.target === overlayRef.current) onCancel();
  };

  // estilos inline
  const overlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000
  };
  const boxStyle = {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };
  const buttonsStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    width: "100%"
  };
  const btnBase = {
    padding: "0.6rem 1.2rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "100px",
    transition: "transform 0.1s"
  };
  const confirmStyle = {
    ...btnBase,
    backgroundColor: "#e7c61b",
    color: "#000"
  };
  const cancelStyle = {
    ...btnBase,
    backgroundColor: "#d9d9d9",
    color: "#000"
  };

  return (
    <div
      ref={overlayRef}
      style={overlayStyle}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div style={boxStyle}>
        <h3 id="logout-modal-title" style={{ margin: 0, marginBottom: "1rem" }}>
          ¿Estás seguro de que quieres cerrar sesión?
        </h3>
        <div style={buttonsStyle}>
          <button
            style={confirmStyle}
            onClick={onConfirm}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Sí, cerrar sesión
          </button>
          <button
            style={cancelStyle}
            onClick={onCancel}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

