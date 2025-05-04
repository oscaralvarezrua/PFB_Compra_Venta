import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useTransactionData(type) {
  const { token } = useAuth();
  const [tSalesPendingData, setSalesPendingData] = useState([]);
  const [tSalesFinishedData, setSalesFinishedData] = useState([]);
  const [tBuysPendingData, setBuysPendingData] = useState([]);
  const [tBuysFinishedData, setBuysFinishedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransData = useCallback(async () => {
    let url;
    switch (type) {
      case "sales-pending":
        url = "/transactions?type=sales&status=pending";
        break;
      case "sales-finished":
        url = "/transactions?type=sales&status=accepted";
        break;
      case "buys-pending":
        url = "/transactions?type=buys&status=pending";
        break;
      case "buys-finished":
        url = "/transactions?type=buys&status=cancelled";
        break;
      default:
        console.warn(`Tipo de transacción desconocida: ${type}`);
        return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setSalesPendingData([]);
          return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      switch (type) {
        case "sales-pending":
          setSalesPendingData(data.data);
          break;
        case "sales-finished":
          setSalesFinishedData(data.data);

          break;
        case "buys-pending":
          setBuysPendingData(data.data);
          break;
        case "buys-finished":
          setBuysFinishedData(data.data);
          break;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [token, type]);

  useEffect(() => {
    if (token) fetchTransData();
  }, [token, fetchTransData]);

  return {
    tSalesPendingData,
    tSalesFinishedData,
    tBuysPendingData,
    tBuysFinishedData,
    loading,
    error,
    reload: fetchTransData,
  };
}
