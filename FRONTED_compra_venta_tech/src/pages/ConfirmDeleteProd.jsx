import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ConfirmDeleteProd.css";
import { useAuth } from "../contexts/AuthContext";

export default function ConfirmDeleteProd() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    const borrarProducto = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message);
        }
        setSubmitMessage("Producto borrado correctamente ✅");
        setTimeout(() => navigate(-1), 2000);
      } catch (e) {
        setSubmitMessage("Error borrando: " + e.message);
      }
    };
    if (id) borrarProducto();
  };

  return (
    <div className="cm-overlay">
      <div className="cm-modal">
        <p className="cm-message">
          ¿Está seguro/a de que desea eliminar este producto? Esta acción no se
          puede deshacer.
        </p>
        <div className="cm-buttons">
          <button className="cm-btn cm-confirm" onClick={handleConfirm}>
            Eliminar
          </button>
          <button className="cm-btn cm-cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
        {submitMessage && (
          <p
            className={`feedback-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </p>
        )}
      </div>
    </div>
  );
}
