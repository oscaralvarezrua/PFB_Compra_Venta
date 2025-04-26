import { useState } from "react";
import eye from "../../assets/eye.png";
import eyeOff from "../../assets/eye-off.png";

export default function PasswordInput({ ...attrs }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <input {...attrs} type={passwordVisible ? "text" : "password"} />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="eye-button"
      >
        {passwordVisible ? <img src={eye} /> : <img src={eyeOff} />}
      </button>
    </>
  );
}
