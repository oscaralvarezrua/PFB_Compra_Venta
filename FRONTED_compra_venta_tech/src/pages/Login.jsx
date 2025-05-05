import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import PasswordInput from "../components/Post/PasswordInput";
import logo from "../assets/logo_negro_recortado.png";
import "../styles/Login.css";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { error, formState, handleSubmit, handleChange } = useLogin();
const navigate = useNavigate();
const { user } = useContext(AuthContext);
   
useEffect(() => {
  if (user?.is_admin) {
    navigate("/admin/dashboard");
  }
}, [user, navigate]);
  
const onSubmit = async (e) => {
  await handleSubmit(e);
   if (user?.is_admin) {
     navigate("/admin/dashboard");
   }
 };

  return (
    <main className="login-page">
      <div>
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

        <Link to="/">
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

        <h2>¡Te damos la bienvenida!</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={onSubmit}>
          <ul>
            <li>
              <input
                type="email"
                required
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Dirección de email"
              />
            </li>
            <li className="password-li">
              <PasswordInput
                required
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </li>
          </ul>

          <Link to="/forgot-password">
            <button type="button" className="forgot-link">
              ¿Has olvidado tu contraseña?
            </button>
          </Link>

          <button type="submit" className="enter-button">
            Entrar a SegundaTec
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
