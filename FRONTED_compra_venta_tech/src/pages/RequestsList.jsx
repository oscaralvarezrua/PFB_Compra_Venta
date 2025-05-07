import React, { useState } from "react";
import "../styles/RequestList.css";
import { useAuth } from "../hooks/useAuth";
import useTransactionData from "../hooks/useTransactionData";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function RequestsList() {
  const { token } = useAuth();
  const [submitMessage, setSubmitMessage] = useState("");
  const { tSalesPendingData, loading, error, reload } =
    useTransactionData("sales-pending");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  if (loading) return <p>Cargando solicitudes…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const handleclickAccept = async (id) => {
    try {
      const res = await fetch(`${VITE_API_URL}/transactions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSubmitMessage("¡Compra aceptada correctamente! ✅");
      reload();
    } catch (err) {
      setSubmitMessage(
        err.message || "Error al aceptar la compra, inténtelo de nuevo."
      );
    }
  };
  const handleClickReject = (id) => {
    setSelectedTransactionId(id);
    setShowRejectModal(true);
  };

  const handleConfirmReject = async () => {
    try {
      const res = await fetch(
        `${VITE_API_URL}/transactions/${selectedTransactionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "cancelled",
            reason: "El vendedor ha rechazado tu solicitud",
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSubmitMessage("¡La compra ha sido rechazada correctamente! ✅");
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedTransactionId(null);
      reload();
    } catch (err) {
      setSubmitMessage(
        err.message || "Error al rechazar la compra, inténtelo de nuevo."
      );
    }
  };

  return (
    <div className="requests-container">
      <h2>Solicitudes de compra pendientes</h2>
      {submitMessage && <p className="submit-message">{submitMessage}</p>}

      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Rechazar solicitud</h3>
            <p>¿Por qué motivo rechazas esta solicitud?</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Escribe el motivo del rechazo..."
              rows="4"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowRejectModal(false)}>
                Cancelar
              </button>
              <button onClick={handleConfirmReject} className="reject-button">
                Confirmar rechazo
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="requests-list">
        {tSalesPendingData.map((request) => (
          <div key={request.transaction_id} className="request-card">
            <img
              src={`${VITE_API_URL}/uploads/${request.photo}`}
              alt={request.name}
            />
            <div className="request-info">
              <h3>{request.name}</h3>
              <p>Precio: {request.price}€</p>
              <p>Solicitante: {request.buyer_name}</p>
              <p>
                Fecha:{" "}
                {new Date(request.transaction_created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="request-actions">
              <button
                onClick={() => handleclickAccept(request.transaction_id)}
                className="accept-button"
              >
                Aceptar
              </button>
              <button
                onClick={() => handleClickReject(request.transaction_id)}
                className="reject-button"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
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
  );
}
