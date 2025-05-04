import React, { useState } from "react";
import "../styles/ProductList.css";
import useProductList from "../hooks/useProductList";
import ApiImage from "../components/Post/ApiImage";
import { Link } from "react-router-dom";

export default function RequestsList() {
  const { productsList, loading, error } = useProductList();
  const [showAvailable, setShowAvailable] = useState(true);

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (productsList?.length === 0)
    return <p className="no-results">No tienes productos publicados.</p>;

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
      {showAvailable ? (
        <ul className="request-list">
          <div>
            <button type="button" onClick={() => setShowAvailable(true)}>
              En Venta
            </button>
          </div>
          <div>
            <button type="button" onClick={() => setShowAvailable(false)}>
              Vendidos
            </button>
          </div>
          {productsList
            ?.filter((prod) => prod.is_available)
            .map((prod) => (
              <li key={prod.id} className="request-item">
                <div className="product-list-image">
                  <ApiImage name={prod.photo} alt={prod.name} />
                </div>
                <div className="request-text">
                  <p>
                    <strong>{prod.price}</strong>{" "}
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
                <div className="request-action"></div>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="request-list">
          <div>
            <button type="button" onClick={() => setShowAvailable(true)}>
              En Venta
            </button>
          </div>
          <div>
            <button type="button" onClick={() => setShowAvailable(false)}>
              Vendidos
            </button>
          </div>

          {productsList
            ?.filter((prod) => !prod.is_available)
            .map((prod) => (
              <li key={prod.id} className="request-item">
                <div className="product-list-image">
                  <ApiImage name={prod.photo} alt={prod.name} />
                </div>
                <div className="request-text">
                  <p>
                    <strong>{prod.price}</strong>{" "}
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
                <div className="request-action"></div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
