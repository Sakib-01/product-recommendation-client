import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const QueryDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [query, setQuery] = useState(null);

  //   useEffect(() => {
  //     fetch(`${import.meta.env.VITE_API_URL}/query/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setQuery(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, [id]);

  useEffect(() => {
    fetchQueryData();
  }, [id]);

  const fetchQueryData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/query/${id}`
    );
    setQuery(data);
    // setStartDate(new Date(data.deadline));
  };

  // Handle if no query is found
  if (!query) return <div>No query found</div>;
  console.log(query);
  //     queryId
  // QueryTitle
  // productName
  // userEmail ( who create the query )
  // userName ( who created the query )
  // Recommender Email ( current user email )
  // Recommender Name ( current user Name )
  // Current Time-Stamp ( current Date )

  const handleRecommend = async (e) => {
    e.preventDefault();

    // Access form data
    const form = e.target;
    const recommendationTitle = form.recommendationTitle.value;
    const recommendedProductName = form.recommendedProductName.value;
    const recommendedProductImage = form.recommendedProductImage.value;
    const recommendationReason = form.recommendationReason.value;

    // Extracting query and user details
    const queryId = query?._id || null; // Ensure a fallback if `query` is undefined
    const queryTitle = query?.queryTitle || "No Query Title";
    const productName = query?.productName || "No Product Name";

    const recomenderEmail = user?.email || "No Email";
    const recomenderName = user?.displayName || "No Name";

    const userEmail = query?.userEmail || "No User Email";
    const userName = query?.userName || "No User Name";

    // Format current date and time
    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    // Construct recommendation object
    const newRecommend = {
      recommendationTitle,
      recommendedProductName,
      recommendedProductImage,
      recommendationReason,
      queryId,
      queryTitle,
      productName,
      recomenderEmail,
      recomenderName,
      userEmail,
      userName,
      currentDateTime,
    };

    // Log to console for debugging
    console.table(newRecommend);

    // Optionally clear the form after submission
    // form.reset();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-recommendation`,
        newRecommend
      );

      // Show success toast and navigate after the post is successful
      //   toast.success("Data added successfully");
      Swal.fire({
        title: "Success!",
        text: "Data added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      //   navigate("/my-posted-jobs");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to add data");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 flex justify-center items-center">
        <div className="mt-4">
          <img className="w-60 mx-auto" src={query.productImageUrl} alt="" />
          <p className="text-xl">
            <strong>Product Name:</strong> {query.productName}
          </p>
          <p className="text-xl">
            <strong>Brand:</strong> {query.productBrand}
          </p>
          <p className="text-xl">
            <strong>Query Title:</strong> {query.queryTitle}
          </p>
          <p className="text-xl">
            <strong>Boycotting Reason:</strong> {query.boycottingReason}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold py-5">
          Do you have any Recommendation ?
        </h1>
        <form onSubmit={handleRecommend}>
          {/* Recommendation Title */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="recommendationTitle"
            >
              Recommendation Title
            </label>
            <input
              id="recommendationTitle"
              name="recommendationTitle"
              placeholder="Enter recommendation title"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              type="text"
              required
            />
          </div>

          {/* Recommended Product Name */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="recommendedProductName"
            >
              Recommended Product Name
            </label>
            <input
              id="recommendedProductName"
              name="recommendedProductName"
              placeholder="Enter recommended product name"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              type="text"
              required
            />
          </div>

          {/* Recommended Product Image URL */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="recommendedProductImage"
            >
              Recommended Product Image URL
            </label>
            <input
              id="recommendedProductImage"
              name="recommendedProductImage"
              placeholder="Enter recommended product image URL"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              type="url"
              required
            />
          </div>

          {/* Recommendation Reason */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="recommendationReason"
            >
              Recommendation Reason
            </label>
            <textarea
              id="recommendationReason"
              name="recommendationReason"
              placeholder="Provide the reason for your recommendation"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Add Recommendation Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Add Recommendation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryDetails;
