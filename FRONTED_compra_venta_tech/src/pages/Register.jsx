//Página de registro
import React from "react";
import useRegister from "../hooks/useRegister";
import PasswordInput from "../components/Post/PasswordInput";
import logo from "../assets/logo_negro_recortado.png";
import close from "../assets/close.png";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const { error, success, formState, handleSubmit, handleChange, handleFileChange } = useRegister();

  return (
    <main className="login-page">
      <div>
        <Link to="/">
          <button className="close-button">
            <img src={close} alt="Cerrar" />
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
    </main>
  );
};

export default Register;
