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
  const handleClickCancel = async (id) => {
    try {
      const res = await fetch(`${VITE_API_URL}/transactions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSubmitMessage("¡La compra ha sido rechazada correctamente! ✅");
      reload();
    } catch (err) {
      setSubmitMessage(
        err.message || "Error al rechazar la compra, inténtelo de nuevo."
      );
    }
  };

  return (
    <div className="requests-container">
      <h2>Solicitudes y notificaciones</h2>
      {tSalesPendingData?.length === 0 ? (
        <p className="no-results">No se encontraron solicitudes de compras.</p>
      ) : (
        <ul className="request-list">
          {tSalesPendingData?.map((trans) => (
            <li key={trans.transaction_id} className="request-item">
              <p className="request-text">
                <strong>{trans.buyer_name}</strong> quiere comprar tu producto{" "}
                <em>{trans.name} </em> por <strong>{trans.price} €</strong>
              </p>
              <div className="request-action">
                <button
                  type="button"
                  onClick={() => handleclickAccept(trans.transaction_id)}
                  className="btn accept"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  onClick={() => handleClickCancel(trans.transaction_id)}
                  className="btn reject"
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
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
