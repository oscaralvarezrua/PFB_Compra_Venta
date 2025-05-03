import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/Post/PasswordInput";
import "../styles/ChangePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.newPassword !== formData.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar la contraseña");
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="change-password-page">
      <div className="change-password-container">
        <h2>Cambiar contraseña</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Contraseña cambiada correctamente. Redirigiendo...</p>}

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Contraseña actual</label>
            <PasswordInput id="currentPassword" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required placeholder="Contraseña actual" />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Nueva contraseña</label>
            <PasswordInput id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required placeholder="Nueva contraseña" />
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

export default ChangePassword;
