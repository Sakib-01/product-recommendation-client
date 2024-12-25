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
import useAxiosSecure from "../hooks/useAxiosSecure";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const MyQuery = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchQueryData();
    }
  }, [user?.email]);
  useEffect(() => {
    document.title = "ProRecco - MyQuery";
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation happens only once
    });
  }, []);

  const fetchQueryData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/my-query/${user?.email}`);
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
      // Show SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // If user confirms, proceed to delete
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/deleteQuery/${id}`
        );
        console.log(data);

        fetchQueryData();
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    } catch (err) {
      console.log(err);

      Swal.fire("Error!", "Failed to delete the data.", "error");
    }
  };
  return (
    <div className="container mx-auto flex flex-col">
      {/* Hero Section */}
      <div data-aos="fade-up" className="hero bg-base-200 h-[450px] my-10">
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
      <div
        data-aos="fade-up"
        className="w-11/12 mx-auto mt-20 md:mt-48 lg:mt-0"
      >
        <h2 className="text-5xl font-bold mb-6 md:pl-5">
          Queries that you have created
        </h2>
        {loading && (
          <p className="text-center text-gray-500">Loading your queries...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && query?.length === 0 && (
          <p className="text-center text-gray-500">
            You haven't created any queries yet.
            <Link to="/addQuery">
              <button className="btn btn-primary ">Add Query...</button>
            </Link>
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
              <div className="flex flex-col md:flex-row items-end gap-1  space-x-4 ml-6">
                <Link to={`/queryDetails/${q._id}`}>
                  <button className="btn btn-primary btn-sm">
                    <GrView />
                  </button>
                </Link>
                <Link to={`/updateQuery/${q._id}`}>
                  <button className="btn btn-warning btn-sm">
                    <FaEdit />
                  </button>
                </Link>
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
