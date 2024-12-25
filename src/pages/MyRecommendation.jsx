import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure, { axiosSecure } from "../hooks/useAxiosSecure";

import AOS from "aos";
import "aos/dist/aos.css";
const MyRecommendation = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchRecommendations();
    }
  }, [user?.email]);

  useEffect(() => {
    document.title = "ProRecco - MyRecommendation";
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation happens only once
    });
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosSecure.get(
        `/my-recommendation/${user?.email}`
      );
      // const response = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/my-recommendation/${user?.email}`,
      //   { withCredentials: true }
      // );
      setRecommendations(response.data.reverse());
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/deleteRecommendation/${id}`
          );
          console.log(data);

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your data has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });

          fetchRecommendations();
        } catch (err) {
          console.error(err);

          // Show error
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div data-aos="fade-up" className="text-center mb-6">
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
              data-aos="fade-up"
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
