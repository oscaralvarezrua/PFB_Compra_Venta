import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useUpdateUser() {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  const updateUser = async (formData) => {
    try {
      console.log("Llamando a updateUser");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
      setError(null);
      setLastMessage(data.message || null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
      setLastMessage(null);
    }
  };

  return { error, success, updateUser, lastMessage };
}
