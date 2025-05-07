import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RatingClick from "../components/Rating/RatingClick";
import "../styles/Review.css";

export default function Review() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions/review/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ratings: rating, comment }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al enviar feedback");
      // Al enviar con éxito, redirigimos a la sección de “Compras”
      navigate("/user/buys-list");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="feedback-page">
      <div className="feedback-card">
        <h2>Transacción finalizada</h2>
        <p className="subtitle">
          ¿Qué tal ha ido todo? Deja tu valoración a continuación.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field rating-field">
            <RatingClick value={rating} count={0} onChange={setRating} />
          </div>
          <div className="field comment-field">
            <textarea
              placeholder="Deja aquí tu comentario"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Enviando…" : "Enviar valoración"}
          </button>
        </form>
      </div>
    </main>
  );
}
