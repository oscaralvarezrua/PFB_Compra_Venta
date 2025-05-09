import { useState } from "react";
import eye from "../../assets/eye.png";
import eyeOff from "../../assets/eye-off.png";

export default function PasswordInput({ ...attrs }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="password-container">
      <input
        {...attrs}
        type={passwordVisible ? "text" : "password"}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="eye-button"
      >
        <img
          src={passwordVisible ? eye : eyeOff}
          alt="Mostrar contraseña"
        />
      </button>
    </div>
  );
}
