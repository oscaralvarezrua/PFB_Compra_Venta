import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function useValidation() {
  const { validationCode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validateUser = async () => {
      if (!validationCode) {
        setStatus("error");
        setMessage("Código de validación no encontrado");
        return;
      }

      try {
        console.log("Intentando validar con código:", validationCode);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/validate/${validationCode}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Respuesta del servidor:", response);
        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (!response.ok) {
          throw new Error(data.message || "Error en la validación");
        }

        setStatus("success");
        setMessage(data.message || "¡Tu cuenta ha sido validada correctamente!");

        // Redirige al login después de 3 segundos
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Error durante la validación:", error);
        setStatus("error");
        setMessage(error.message || "Ha ocurrido un error al validar tu cuenta");
      }
    };

    validateUser();
  }, [validationCode, navigate]);

  return { status, message };

