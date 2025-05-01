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
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
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
