import React, { useState } from "react";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "No hay ninguna cuenta con ese correo");
      }
      setMessage("Te hemos enviado un email con instrucciones para recuperar tu contraseña.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Recuperar contraseña</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Introduce tu correo" />
          </div>
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
