import React, { useState } from "react";
import "../styles/ProfileProdList.css";
import useTransactionData from "../hooks/useTransactionData";
import ProductCardProfile from "../components/ProductCardProfile/ProductCardProfile";
import { Link } from "react-router-dom";
import NoResultsMessage from "../components/NoResultsMessage/NoResultsMessage";

export default function BuysList() {
  const { tBuysPendingData, loading } = useTransactionData("buys-pending");
  const { tBuysFinishedData } = useTransactionData("buys-accepted");
  const { tBuysCancelledData } = useTransactionData("buys-cancelled");
  const [showAvailable, setShowAvailable] = useState(true);
  const [showRejected, setShowRejected] = useState(false);

  if (loading) return <p>Cargando productos…</p>;

  return (
    <div className="requests-container">
      <h2>Compras</h2>
      <div className="seccion-btn-prod">
        <button
          className={`btn enventa ${showAvailable ? "active-prod" : ""}`}
          type="button"
          onClick={() => {
            setShowAvailable(true);
            setShowRejected(false);
          }}
        >
          Pendientes
        </button>

        <button
          className={`btn vendidos ${
            !showAvailable && !showRejected ? "active-prod" : ""
          }`}
          type="button"
          onClick={() => {
            setShowAvailable(false);
            setShowRejected(false);
          }}
        >
          Finalizadas
        </button>
        <button
          className={`btn vendidos ${
            !showAvailable && showRejected ? "active-prod" : ""
          }`}
          type="button"
          onClick={() => {
            setShowAvailable(false);
            setShowRejected(true);
          }}
        >
          Rechazadas
        </button>
      </div>
      {showAvailable && !showRejected ? (
        tBuysPendingData?.length !== 0 ? (
          <div className="requests-list">
            {tBuysPendingData?.map((buy) => (
              <ProductCardProfile
                photo={buy.photo}
                name={buy.name}
                price={buy.price}
                updated_at={buy.transaction_created_at}
                date_type={"solicitud"}
              >
                <div className="request-actions">
                  <p>
                    La transacción está pendiente de aceptación por parte del
                    vendedor/a.
                  </p>
                </div>
              </ProductCardProfile>
            ))}
          </div>
        ) : (
          <NoResultsMessage message={"No hay compras pendientes."} />
        )
      ) : !showAvailable && !showRejected ? (
        tBuysFinishedData?.length !== 0 ? (
          <div className="requests-list">
            {tBuysFinishedData?.map((buy) => (
              <ProductCardProfile
                photo={buy.photo}
                name={buy.name}
                price={buy.price}
                updated_at={buy.product_updated_at}
                date_type={"compra"}
              >
                <div className="request-actions">
                  {buy.ratings === null ? (
                    <Link to={"/user/review/" + buy.transaction_id}>
                      <button className="btn-rating" type="button">
                        Deja tu valoración
                      </button>
                    </Link>
                  ) : (
                    <p>Valoración enviada ✅</p>
                  )}
                </div>
              </ProductCardProfile>
            ))}
          </div>
        ) : (
          <NoResultsMessage message={"No hay compras finalizadas."} />
        )
      ) : tBuysCancelledData?.length !== 0 ? (
        <div className="requests-list">
          {tBuysCancelledData?.map((buy) => (
            <ProductCardProfile
              photo={buy.photo}
              name={buy.name}
              price={buy.price}
              updated_at={buy.product_updated_at}
              date_type={"rechazo"}
            >
              <div className="revision-message">
                {" "}
                <p>Su solicitud ha sido rechazada por el vendedor.</p>{" "}
                <p>Revise su correo electrónico para conocer el motivo.</p>
              </div>
            </ProductCardProfile>
          ))}
        </div>
      ) : (
        <NoResultsMessage message={"No hay compras Rechazadas."} />
      )}
    </div>
  );
}
