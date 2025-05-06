//Página de registro
import React from "react";
import useRegister from "../hooks/useRegister";
import PasswordInput from "../components/Post/PasswordInput";
import logo from "../assets/logo_negro_recortado.png";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const { error, success, formState, handleSubmit, handleChange, handleFileChange } = useRegister();
  const navigate = useNavigate();
  
  return (
    <main className="register-page">
      <div className="data-box">
      <div>
        <Link to="/">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver atrás"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="back-icon-svg"
          >
            <path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className="close-button" type="button" aria-label="Cerrar">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="close-icon-svg"
            >
              <line
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </Link>
        <div className="logo-login">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <h2>¡Crea tu cuenta!</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="username"></label>
              <input type="text" required id="username" name="username" value={formState.username} onChange={handleChange} placeholder="Nombre de usuario" />
            </li>
            <li>
              <label htmlFor="email"></label>
              <input type="email" required id="email" name="email" value={formState.email} onChange={handleChange} placeholder="Dirección de email" />
            </li>
            <li className="password-li">
              <label htmlFor="password"></label>
              <PasswordInput required id="password" name="password" value={formState.password} onChange={handleChange} placeholder="Contraseña" />
            </li>
            <li>
              <label htmlFor="phone"></label>
              <input type="tel" required id="phone" name="phone" value={formState.phone} onChange={handleChange} placeholder="Teléfono" />
            </li>
            <li>
              <label htmlFor="biography"></label>
              <textarea id="biography" name="biography" value={formState.biography} onChange={handleChange} placeholder="Biografía (opcional)" maxLength="500" />
            </li>
            <li>
              <label htmlFor="avatar">Foto de perfil (opcional):</label>
              <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} />
            </li>
          </ul>
          <button className="enter-button">Crear cuenta</button>
        </form>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
