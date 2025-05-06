import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  const blankState = {
    username: "",
    email: "",
    password: "",
    phone: "",
    biography: "",
  };

  const [formState, setFormState] = useState(blankState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatar, setAvatar] = useState(null);

  function handleChange({ target: { name, value } }) {
    setError("");
    setSuccess("");
    setFormState({ ...formState, [name]: value });
  }

  function handleFileChange(e) {
    setAvatar(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      let response;

      if (avatar) {
        // Si hay avatar, usamos FormData
        const formData = new FormData();
        Object.entries(formState).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("avatar", avatar);

        response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
          method: "POST",
          body: formData,
        });
      } else {
        // Si no hay avatar, enviamos JSON
        response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });
      }

      let json;
      try {
        json = await response.json();
      } catch (error) {
        throw new Error("Error al procesar la respuesta del servidor");
      }

      if (!response.ok) {
        throw new Error(json.message || "Error en el registro");
      }

      setSuccess("¡Registro exitoso! Por favor, revisa tu correo electrónico para validar tu cuenta.");

      setTimeout(() => {
        navigate("/login");
      }, 10000);
    } catch (error) {
      setError(error.message);
    }
  }

  return { error, success, formState, handleSubmit, handleChange, handleFileChange };
}
