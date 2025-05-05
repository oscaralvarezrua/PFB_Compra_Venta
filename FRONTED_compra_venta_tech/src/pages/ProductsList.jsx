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
        <ul className="request-list">
          {productsList
            ?.filter((prod) => prod.is_available && prod.is_accepted)
            .map((prod) => (
              <li key={prod.id} className="request-item">
                <div className="product-list-image">
                  <ApiImage name={prod.photo} alt={prod.name} />
                </div>
                <div className="request-text">
                  <p>
                    <strong>{prod.price} €</strong>{" "}
                  </p>
                  <p>{prod.name} </p>
                </div>
                <div className="request-text">
                  <p>
                    <strong>Publicado</strong>{" "}
                  </p>
                  <p>{formatDMY(prod.created_at)} </p>
                </div>
                <div className="request-text">
                  <p>
                    <strong>Modificado</strong>{" "}
                  </p>
                  <p>{formatDMY(prod.updated_at)} </p>
                </div>
                <div>
                  <button
                    className="btn editar"
                    type="button"
                    onClick={() => {
                      navigate("/edit/" + prod.id);
                    }}
                  >
                    Editar
                  </button>
                  <Link to={"/user/confirm-delete/" + prod.id}>
                    <button className="btn delete" type="button">
                      Eliminar
                    </button>
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      ) : showAvailable && showEnRevision ? (
        <ul className="request-list">
          {productsList
            ?.filter((prod) => !prod.is_accepted)
            .map((prod) => (
              <li key={prod.id} className="request-item">
                <div className="product-list-image">
                  <ApiImage name={prod.photo} alt={prod.name} />
                </div>
                <div className="request-text">
                  <p>
                    <strong>{prod.price} €</strong>{" "}
                  </p>
                  <p>{prod.name} </p>
                </div>
                <div className="request-text">
                  <p>
                    <strong>Publicado</strong>{" "}
                  </p>
                  <p>{formatDMY(prod.created_at)} </p>
                </div>
                <div className="request-text">
                  <p>
                    <strong>Modificado</strong>{" "}
                  </p>
                  <p>{formatDMY(prod.updated_at)} </p>
                </div>
                <div className="revision-message">
                  <p>Su producto está en proceso de revisión.</p>
                  <p>Una vez aprobado, estará disponible para la venta.</p>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="request-list">
          {productsList
            ?.filter((prod) => !prod.is_available)
            .map((prod) => (
              <li key={prod.id} className="request-item">
                <div className="product-list-image">
                  <ApiImage name={prod.photo} alt={prod.name} />
                </div>
                <div className="request-text">
                  <p>
                    <strong>{prod.price} €</strong>{" "}
                  </p>
                  <p>{prod.name} </p>
                </div>
                <div className="request-text">
                  <p>
                    <strong>Publicado</strong>{" "}
                  </p>
                  <p>{formatDMY(prod.created_at)} </p>
                </div>
                <div className="request-text">
                  <p>
                    <strong>Modificado</strong>{" "}
                  </p>
                  <p>{formatDMY(prod.updated_at)} </p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
