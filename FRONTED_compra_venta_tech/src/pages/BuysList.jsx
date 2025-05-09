import React, { useState } from "react";
import "../styles/ProductList.css";
import useTransactionData from "../hooks/useTransactionData";
import ApiImage from "../components/Post/ApiImage";

import { Link } from "react-router-dom";

export default function BuysList() {
  const { tBuysPendingData, loading } = useTransactionData("buys-pending");
  const { tBuysFinishedData } = useTransactionData("buys-accepted");
  const [showAvailable, setShowAvailable] = useState(true);

  if (loading) return <p>Cargando productos…</p>;

  if (tBuysFinishedData?.length === 0 && tBuysPendingData?.length === 0)
    return (
      <div>
        <h2>Compras</h2>
        <div>
          <img
            src="/src/assets/No_hay_nada.png"
            alt="No hay compras realizadas."
            className="image-nada"
          />
          <p>No hay nada por aquí.</p>
        </div>
      </div>
    );

  const formatDMY = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="requests-container">
      <h2>Compras</h2>
      <div className="seccion-btn-prod">
        <button
          className={`btn enventa ${showAvailable ? "active-prod" : ""}`}
          type="button"
          onClick={() => {
            setShowAvailable(true);
          }}
        >
          Pendientes
        </button>

        <button
          className={`btn vendidos ${!showAvailable ? "active-prod" : ""}`}
          type="button"
          onClick={() => {
            setShowAvailable(false);
          }}
        >
          Finalizadas
        </button>
      </div>
      {showAvailable ? (
        <div className="requests-list">
          {tBuysPendingData?.map((buy) => (
            <div key={buy.id} className="request-card">
              <ApiImage name={buy.photo} alt={buy.name} />
              <div className="request-info">
                <h3>{buy.name}</h3>
                <p>Precio: {buy.price}€</p>
                {/* <p>Fecha publicación: {formatDMY(buy.created_at)}</p>
                  <p>Fecha Modificación: {formatDMY(buy.updated_at)}</p> */}
              </div>

              <div className="request-actions">
                <p>
                  La transacción está pendiente de aceptación por parte del
                  vendedor/a.
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="requests-list">
          {tBuysFinishedData?.map((buy) => (
            <div key={buy.id} className="request-card">
              <ApiImage name={buy.photo} alt={buy.name} />
              <div className="request-info">
                <h3>{buy.name}</h3>
                <p>Precio: {buy.price}€</p>
                <p>Fecha de Compra: {formatDMY(buy.product_updated_at)}</p>
              </div>

              <div className="request-actions">
                {buy.ratings === null ? (
                  <Link to={"/user/review/" + buy.transaction_id}>
                    <button className="btn delete" type="button">
                      Dejar una valoración
                    </button>
                  </Link>
                ) : (
                  <p>Valoración enviada ✅</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
