import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useUpdateUser() {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (formData) => {
    try {
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
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return { error, success, updateUser };
}
