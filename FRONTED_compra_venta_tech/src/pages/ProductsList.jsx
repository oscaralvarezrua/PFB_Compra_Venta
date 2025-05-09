import React, { useState } from "react";
import "../styles/ProductList.css";
import useProductList from "../hooks/useProductList";
import ApiImage from "../components/Post/ApiImage";

import { Link, useNavigate } from "react-router-dom";

export default function RequestsList() {
  const { productsList, loading } = useProductList();
  const [showAvailable, setShowAvailable] = useState(true);
  const [showEnRevision, setShowEnRevision] = useState(false);

  const navigate = useNavigate();

  if (loading) return <p>Cargando productos…</p>;
  //if (error) return <p className="error">Error: {error}</p>;
  if (productsList?.length === 0 || productsList === undefined)
    return (
      <div>
        <h2>Tus Productos</h2>
        <p className="no-results">No tienes productos publicados.</p>
        <div>
          <img
            src="/src/assets/No_hay_nada.png"
            alt="No tienes productos publicados."
            className="image-nada"
          />
          <p>No tienes productos publicados.</p>
        </div>
      </div>
    );

  const formatDMY = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  //Mostramos productos en venta o Vendidos según el botón clicado
  return (
    <div className="requests-container">
      <h2>Tus Productos</h2>
      <div className="seccion-btn-prod">
        <button
          className={`btn enventa ${
            showAvailable && !showEnRevision ? "active-prod" : ""
          }`}
          type="button"
          onClick={() => {
            setShowAvailable(true);
            setShowEnRevision(false);
          }}
        >
          En Venta
        </button>

        <button
          className={`btn vendidos ${!showAvailable ? "active-prod" : ""}`}
          type="button"
          onClick={() => {
            setShowAvailable(false);
            setShowEnRevision(false);
          }}
        >
          Vendidos
        </button>
        <button
          className={`btn revision ${
            showAvailable && showEnRevision ? "active-prod" : ""
          }`}
          type="button"
          onClick={() => {
            setShowEnRevision(true);
            setShowAvailable(true);
          }}
        >
          En revision
        </button>
      </div>
      {showAvailable && !showEnRevision ? (
        <div className="requests-list">
          {productsList
            ?.filter((prod) => prod.is_available && prod.is_accepted)
            .map((prod) => (
              <div key={prod.id} className="request-card">
                <ApiImage name={prod.photo} alt={prod.name} />

                <div className="request-info">
                  <h3>{prod.name}</h3>
                  <p>Precio: {prod.price}€</p>
                  <p>Fecha publicación: {formatDMY(prod.created_at)}</p>
                  <p>Fecha Modificación: {formatDMY(prod.updated_at)}</p>
                </div>

                <div className="request-actions">
                  <button
                    className="accept-button"
                    type="button"
                    onClick={() => {
                      navigate("/edit/" + prod.id);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="reject-button"
                    type="button"
                    onClick={() => {
                      navigate("/user/confirm-delete/" + prod.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : showAvailable && showEnRevision ? (
        <div className="requests-list">
          {productsList
            ?.filter((prod) => !prod.is_accepted)
            .map((prod) => (
              <div key={prod.id} className="request-card">
                <ApiImage name={prod.photo} alt={prod.name} />
                <div className="request-info">
                  <h3>{prod.name}</h3>
                  <p>Precio: {prod.price}€</p>
                  <p>Fecha publicación: {formatDMY(prod.created_at)}</p>
                  <p>Fecha Modificación: {formatDMY(prod.updated_at)}</p>
                </div>

                <div className="revision-message">
                  <p>Su producto está en proceso de revisión.</p>
                  <p>Una vez aprobado, estará disponible para la venta.</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="requests-list">
          {productsList
            ?.filter((prod) => !prod.is_available)
            .map((prod) => (
              <div key={prod.id} className="request-card">
                <ApiImage name={prod.photo} alt={prod.name} />
                <div className="request-info">
                  <h3>{prod.name}</h3>
                  <p>Precio: {prod.price}€</p>
                  <p>Fecha publicación: {formatDMY(prod.created_at)}</p>
                  <p>Fecha de venta: {formatDMY(prod.updated_at)}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
