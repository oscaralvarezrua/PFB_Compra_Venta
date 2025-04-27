
import React from "react";
import useLogin from "../hooks/useLogin";
import PasswordInput from "../components/Post/PasswordInput";
import logo from "../assets/logo_negro_recortado.png";
import close from "../assets/close.png";
//import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { error, formState, handleSubmit, handleChange } = useLogin();
  return (
    <main>
      <div>
        <Link to="/">
          <button className="close-button">
            <img src={close} />
          </button>
        </Link>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <h2>¡Te damos la bienvenida!</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="email"></label>
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
              <label htmlFor="password"></label>
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
          <Link to="/changepassword">
            <button className="change-pass-button">
              ¿Has olvidado tu contraseña?
            </button>
          </Link>

          <button className="enter-button">Entrar a SegundaTec</button>
        </form>
      </div>
    </main>
  );
};

export default Login;

