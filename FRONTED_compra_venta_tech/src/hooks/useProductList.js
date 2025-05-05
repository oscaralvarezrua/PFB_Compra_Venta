import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import useUserData from "../hooks/useUserData";

export default function useProductList() {
  const { userData } = useUserData();
  const { token } = useAuth();
  const [productsList, setProductsLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcProducts = useCallback(async () => {
    if (!token || !userData?.id) return;
    setLoading(true);
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
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProductsLists(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [token, userData?.id]);

  useEffect(() => {
    fetcProducts();
  }, [fetcProducts]);

  return { productsList, loading, error, reload: fetcProducts };
}
