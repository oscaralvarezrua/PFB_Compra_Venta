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
          `${import.meta.env.VITE_API_URL}/users/info`,
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
        console.log("Raating" + data?.data);

        const count = data.data.stats.total_ratings;
        const ratingAvg = data.data.stats.average_ratings;
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
