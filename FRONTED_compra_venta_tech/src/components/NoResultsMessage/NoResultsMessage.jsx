import React from "react";

export default function NoResultsMessage({ message }) {
  return (
    <div>
      <p className="no-results">{message}</p>
      <img
        src="/src/assets/No_hay_nada.png"
        alt={message}
        className="image-nada"
      />
    </div>
  );
}
