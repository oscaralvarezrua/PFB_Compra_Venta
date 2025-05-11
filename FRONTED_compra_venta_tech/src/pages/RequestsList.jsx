import React, { useState } from "react";
import "../styles/ProfileProdList.css";
import { useAuth } from "../hooks/useAuth";
import useTransactionData from "../hooks/useTransactionData";
import ProductCardProfile from "../components/ProductCardProfile/ProductCardProfile";
import NoResultsMessage from "../components/NoResultsMessage/NoResultsMessage";
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
  if (tSalesPendingData?.length === 0)
    return (
      <div className="requests-container">
        <h2>Tus Solicitudes</h2>
        <NoResultsMessage message={"No tienes solicitudes de compra."} />
      </div>
    );

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
            reason: rejectReason,
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
          <ProductCardProfile
            photo={request.photo}
            name={request.name}
            price={request.price}
            buyer_name={request.buyer_name}
            updated_at={request.transaction_created_at}
            date_type={"solicitud"}
          >
            <div className="request-actions">
              <button
                onClick={() => handleclickAccept(request.transaction_id)}
                className="ok-btn"
              >
                Aceptar
              </button>
              <button
                onClick={() => handleClickReject(request.transaction_id)}
                className="reject-btn"
              >
                Rechazar
              </button>
            </div>
          </ProductCardProfile>
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
