import React, { useState } from "react";
import "../styles/ProfileProdList.css";
import useProductList from "../hooks/useProductList";
import ProductCardProfile from "../components/ProductCardProfile/ProductCardProfile";
import NoResultsMessage from "../components/NoResultsMessage/NoResultsMessage";

import { useNavigate } from "react-router-dom";

export default function RequestsList() {
  const { productsList, loading } = useProductList();
  const [showAvailable, setShowAvailable] = useState(true);
  const [showEnRevision, setShowEnRevision] = useState(false);

  const navigate = useNavigate();

  if (loading) return <p>Cargando productos…</p>;

  const productsOnSale = productsList?.filter(
    (prod) => prod.is_available && prod.is_accepted
  );
  const productsOnReview = productsList?.filter((prod) => !prod.is_accepted);
  const productsSold = productsList?.filter((prod) => !prod.is_available);

  //Mostramos productos en venta, vendidos o en revisión según el botón clicado
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
        productsOnSale?.length !== 0 ? (
          <div className="requests-list">
            {productsOnSale.map((prod) => (
              <ProductCardProfile
                photo={prod.photo}
                name={prod.name}
                price={prod.price}
                created_at={prod.created_at}
                updated_at={prod.updated_at}
                date_type={"modificación"}
              >
                <div className="request-actions">
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => {
                      navigate("/edit/" + prod.id);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="remove-btn"
                    type="button"
                    onClick={() => {
                      navigate("/user/confirm-delete/" + prod.id);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </ProductCardProfile>
            ))}
          </div>
        ) : (
          <NoResultsMessage message={"No tienes productos a la venta."} />
        )
      ) : showAvailable && showEnRevision ? (
        productsList?.length !== 0 ? (
          productsOnReview?.length !== 0 ? (
            <div className="requests-list">
              {productsOnReview.map((prod) => (
                <ProductCardProfile
                  photo={prod.photo}
                  name={prod.name}
                  price={prod.price}
                  created_at={prod.created_at}
                  updated_at={prod.updated_at}
                  date_type={"modificación"}
                >
                  <div className="revision-message">
                    <p>Su producto está en proceso de revisión.</p>
                    <p>Una vez aprobado, estará disponible para la venta.</p>
                  </div>
                </ProductCardProfile>
              ))}
            </div>
          ) : (
            <NoResultsMessage message={"No tienes productos en revisión."} />
          )
        ) : (
          <NoResultsMessage
            message={"No tienes productos pendientes de revisión."}
          />
        )
      ) : productsSold?.length !== 0 ? (
        <div className="requests-list">
          {productsSold
            ?.filter((prod) => !prod.is_available)
            .map((prod) => (
              <ProductCardProfile
                photo={prod.photo}
                name={prod.name}
                price={prod.price}
                created_at={prod.created_at}
                updated_at={prod.updated_at}
                date_type={"venta"}
              />
            ))}
        </div>
      ) : (
        <NoResultsMessage message={"No tienes productos vendidos."} />
      )}
    </div>
  );
}
