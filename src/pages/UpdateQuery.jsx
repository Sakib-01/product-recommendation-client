import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UpdateQuery = () => {
  const { id } = useParams(); // Get the id from URL
  const [query, setQuery] = useState(null); // State for the query data
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQueryData();
  }, [id]);

  const fetchQueryData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/query/${id}`
      );
      console.log("Fetched data:", data);
      setQuery(data);
    } catch (error) {
      console.error("Error fetching query data:", error.message);
      setError("Failed to fetch query data. Please try again later.");
    }
  };

  if (!query) {
    return <LoadingSpinner />;
  }

  console.log(id);
  console.log(query);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const productImageUrl = form.productImageUrl.value;
    const queryTitle = form.queryTitle.value;
    const boycottingReason = form.boycottingReason.value;
    const updatedQuery = {
      productName,
      productBrand,
      productImageUrl,
      queryTitle,
      boycottingReason,
    };

    console.log(updatedQuery);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-query/${id}`,
        updatedQuery
      );

      Swal.fire({
        title: "Success!",
        text: "Data updated successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/myQuery");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to add data");
    }
  };
  return (
    <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl text-center underline font-bold text-gray-800 mb-8">
        Add Product Query
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="mt-4  col-span-1">
          <h1 className="text-2xl font-bold underline text-gray-800 mb-4">
            Product details
          </h1>
          <img className="w-60 mx-auto" src={query.productImageUrl} alt="" />
          <div>
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
        <div className="col-span-1">
          <h1 className="text-2xl font-bold underline text-gray-800 mb-4">
            Update query
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                id="productName"
                name="productName"
                defaultValue={query.productName}
                placeholder="Enter product name"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                required
              />
            </div>

            {/* Product Brand */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="productBrand"
              >
                Product Brand
              </label>
              <input
                id="productBrand"
                name="productBrand"
                defaultValue={query.productBrand}
                placeholder="Enter product brand"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                required
              />
            </div>

            {/* Product Image URL */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="productImageUrl"
              >
                Product Image URL
              </label>
              <input
                id="productImageUrl"
                name="productImageUrl"
                defaultValue={query.productImageUrl}
                placeholder="Enter product image URL"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                type="url"
                required
              />
            </div>

            {/* Query Title */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="queryTitle"
              >
                Query Title
              </label>
              <input
                id="queryTitle"
                name="queryTitle"
                defaultValue={query.queryTitle}
                placeholder="Ex: Is there any better product that gives me the same quality?"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                required
              />
            </div>

            {/* Boycotting Reason */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="boycottingReason"
              >
                Boycotting Reason
              </label>
              <textarea
                id="boycottingReason"
                name="boycottingReason"
                defaultValue={query.boycottingReason}
                placeholder="Provide the reason you don't want this product"
                className="block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Add Query Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Update Query
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuery;
