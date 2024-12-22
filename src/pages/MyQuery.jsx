import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import queryLottie from "../assets/Lottie/query.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { GrView } from "react-icons/gr";
import { FaEdit, FaRegComments } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

const MyQuery = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchQueryData();
    }
  }, [user?.email]);

  const fetchQueryData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-query/${user?.email}`
      );
      const sortedData = data.sort(
        (a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime)
      );
      setQuery(sortedData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch queries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  console.log(query);

  //   handle delete functionality

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/deleteQuery/${id}`
      );
      console.log(data);
      toast.success("Data Deleted Successfully!!!");
      fetchQueryData();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="container mx-auto flex flex-col">
      {/* Hero Section */}
      <div className="hero bg-base-200 h-[450px] my-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Lottie animationData={queryLottie} className="w-1/2" />
          <div>
            <h1 className="text-5xl font-bold">Do you have any Query?</h1>
            <p className="py-6">
              You can ask about any product and get the best recommendations
              from other users. That may help you to find your best goods...
            </p>
            <Link to="/addQuery">
              <button className="btn btn-primary ">Add Query...</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Queries Section */}
      <div className="mt-20 md:mt-48 lg:mt-0">
        <h2 className="text-5xl font-bold mb-6">
          Queries that you have created
        </h2>
        {loading && (
          <p className="text-center text-gray-500">Loading your queries...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && query?.length === 0 && (
          <p className="text-center text-gray-500">
            You haven't created any queries yet.
          </p>
        )}
        {query?.map((q) => (
          <div key={q._id} className="max-w-7xl mx-auto mb-4">
            <div className="flex items-center justify-between bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
              {/* Image Section */}
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  className="w-full h-full rounded"
                  src={q.productImageUrl}
                  alt={q.productName}
                />
              </div>

              {/* Product and Query Information */}
              <div className="flex-grow ml-6 space-y-2">
                {/* Product Name and Brand */}
                <h3 className="text-lg font-bold">{q.productName}</h3>
                <p className="text-sm text-gray-600">{q.queryTitle}</p>
              </div>
              {/* Brand and Date Information */}
              <div className="hidden md:block flex-grow ml-6 space-y-2">
                {/* Product Name and Brand */}
                <h3 className="text-lg font-bold">{q.productBrand}</h3>
                <p className="text-sm text-gray-600">
                  Posted Date :{format(new Date(q.currentDateTime), "P")}
                </p>
              </div>

              {/* Recommendation Count */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  <FaRegComments />
                </p>
                <p className="font-bold">{q.recommendationCount}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row space-x-4 ml-6">
                <Link to={`/queryDetails/${q._id}`}>
                  <button className="btn btn-primary btn-sm">
                    <GrView />
                  </button>
                </Link>
                <button className="btn btn-warning btn-sm">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="btn btn-error btn-sm"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuery;
