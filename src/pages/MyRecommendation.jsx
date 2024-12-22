import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetchRecommendations();
    }
  }, [user?.email]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-recommendation/${user?.email}`
      );
      setRecommendations(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Recommendations{" "}
          {recommendations.length > 0 && `(${recommendations.length})`}
        </h2>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {/* No Recommendations */}
      {!loading && recommendations.length === 0 && (
        <p className="text-center text-gray-500">
          You haven't created any recommendations yet.
        </p>
      )}

      {/* Recommendations with Query Comparison */}
      {!loading && recommendations.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Query Details */}
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Query: {rec.queryTitle}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <img
                      src={rec.productImageUrl}
                      alt={rec.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">
                        Product: {rec.productName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendation Details */}
                <div className=" md:border-l-2 md:pl-20 flex-1 ">
                  <h3 className="text-lg font-semibold text-blue-600">
                    Recommendation: {rec.recommendationTitle}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <img
                      src={rec.recommendedProductImage}
                      alt={rec.recommendedProductName}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">
                        Recommended Product: {rec.recommendedProductName}
                      </p>
                      <p className="text-gray-600">
                        Reason: {rec.recommendationReason}
                      </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col items-end flex-grow space-y-3 ml-6">
                      <Link to={`/queryDetails/${rec._id}`}>
                        <button className="btn btn-primary btn-sm">
                          <GrView />
                        </button>
                      </Link>
                      <Link to={`/updateQuery/${rec._id}`}>
                        <button className="btn btn-warning btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="btn btn-error btn-sm"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecommendation;
