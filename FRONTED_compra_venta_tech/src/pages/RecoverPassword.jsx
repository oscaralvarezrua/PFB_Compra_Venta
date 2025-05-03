import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PasswordInput from "../components/Post/PasswordInput";
import "../styles/ChangePassword.css";

const RecoverPassword = () => {
  const { recoveryCode } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/recover/${recoveryCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: formData.password,
          repeatPassword: formData.repeatPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar la contraseña");
      }
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="change-password-page">
      <div className="change-password-container">
        <h2>Establecer nueva contraseña</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Contraseña cambiada correctamente. Redirigiendo...</p>}
        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña</label>
            <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Nueva contraseña" />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repetir nueva contraseña</label>
            <PasswordInput id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} required placeholder="Repetir nueva contraseña" />
          </div>
          <button type="submit" className="submit-button">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </main>
  );
};

export default RecoverPassword;
