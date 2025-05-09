import React from "react";
import "../../styles/ProfileProdList.css";
import ApiImage from "../Post/ApiImage";

export default function ProductCardProfile({
  photo,
  name,
  price,
  created_at,
  buyer_name = null,
  updated_at = null,
  date_type = null,
  children = null,
}) {
  const formatDMY = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="request-card">
      <div className="request-image">
        <ApiImage name={photo} alt={name} />
      </div>

      <div className="request-info">
        <h3>{name}</h3>
        <p>Precio: {price}€</p>
        {buyer_name && <p>Solicitante: {buyer_name}</p>}
        {created_at && <p>Fecha publicación: {formatDMY(created_at)}</p>}
        {updated_at && (
          <p>
            Fecha de {date_type}: {formatDMY(updated_at)}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
