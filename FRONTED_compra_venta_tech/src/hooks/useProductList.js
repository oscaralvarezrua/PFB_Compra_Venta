import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import useUserData from "../hooks/useUserData";

export default function useProductList() {
  const { userData } = useUserData();
  const { token } = useAuth();
  const [productsList, setProductsLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !userData?.id) return;
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/list/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        const data = await response.json();
        setProductsLists(data.data);
        console.log(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, userData]);

  return { productsList, loading, error };
}
