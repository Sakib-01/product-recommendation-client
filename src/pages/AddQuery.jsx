import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  //   console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productBrand = form.productBrand.value;
    const productImageUrl = form.productImageUrl.value;
    const queryTitle = form.queryTitle.value;
    const boycottingReason = form.boycottingReason.value;
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userImage = user?.photoURL;

    const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const recommendationCount = 0;
    const newQuery = {
      productName,
      productBrand,
      productImageUrl,
      queryTitle,
      boycottingReason,
      currentDateTime,
      recommendationCount,
      userName,
      userEmail,
      userImage,
    };

    // fetch("http://localhost:5000/add-query", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newQuery),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (insertedId) {
    //       // Check if insertedId is present in the response
    //       toast.success("Query added successfully!");
    //     } else {
    //       toast.error("Failed to add query.");
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error("Error:", error);
    //     alert("Failed to add query.");
    //   });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-query`, newQuery);

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
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Add Product Query
      </h2>
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
            Add Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuery;
