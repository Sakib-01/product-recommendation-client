import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchRecommendationData();
    }
  }, [user?.email]);

  const fetchRecommendationData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-recommendation/${user?.email}`
      );

      setRecommendation(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch queries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  console.log(recommendation);
  if (!recommendation) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2>My Recommendation {recommendation.length}</h2>
    </div>
  );
};

export default MyRecommendation;
