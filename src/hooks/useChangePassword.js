import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useChangePassword() {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return { error, success, changePassword };
}
