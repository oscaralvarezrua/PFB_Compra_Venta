import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function useAverageRating() {
  const { token } = useAuth();

  const [averageUserRating, setAverageUserRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/transactions?type=sales&status=accepted`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("No existen las transacciones solicitadas");
        }
        const data = await response.json();
        console.log(data.data);

        const ratingTotal = data.data.reduce((acc, transaction) => {
          return acc + Number(transaction.ratings);
        }, 0);
        const count = data.data.length;
        const ratingAvg = count > 0 ? ratingTotal / count : 0;
        setNumberOfRatings(count);
        setAverageUserRating(ratingAvg);
      } catch (error) {
        setError(error.message);
      }
    };

    if (token) {
      fetchAverageData();
    }
  }, [token]);

  return {
    averageUserRating,
    numberOfRatings,

    error,
  };
}
