import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RecommendationCard from "../components/RecommendationCard";
import useAxiosSecure, { axiosSecure } from "../hooks/useAxiosSecure";

import AOS from "aos";
import "aos/dist/aos.css";
const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [recomendations, setRecomendations] = useState(null); // State for the recomendations data
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecomendationsData();
  }, [user?.email]);

  useEffect(() => {
    document.title = "ProRecco - Recommendations For Me";
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation happens only once
    });
  }, []);

  const fetchRecomendationsData = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/recommendation-for-me/${user?.email}`
      );
      // const { data } = await axios.get(
      //   `${import.meta.env.VITE_API_URL}/recommendation-for-me/${user?.email}`,
      //   { withCredentials: true }
      // );
      console.log("Fetched data:", data);
      setRecomendations(data);
    } catch (error) {
      console.error("Error fetching recomendations data:", error.message);
      setError("Failed to fetch recomendations data. Please try again later.");
    }
  };

  if (!recomendations) {
    return <LoadingSpinner />;
  }
  console.log(recomendations);
  const uniqueName = [
    ...new Map(
      recomendations.map((recomendation) => [
        recomendation.productName, // Use productName as the key
        {
          productName: recomendation.productName,
          productImageURL: recomendation.productImageUrl,
        },
      ])
    ).values(),
  ];

  return (
    <div>
      <Tabs>
        <div data-aos="fade-up" className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl mb-5">
            Product Recommended By Other User
          </h1>
          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
            Check this Recommended products and make Best Choice for you!!
          </p>
          <div
            data-aos="zoom-in"
            className="flex items-center justify-center mb-6"
          >
            <TabList className="flex items-center justify-center space-x-6 p-4 bg-gray-100 rounded-xl shadow-md">
              {uniqueName.map((name, index) => (
                <Tab
                  key={index}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 ease-in-out rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {name.productName}
                </Tab>
              ))}
            </TabList>
          </div>

          {uniqueName.map((name, index) => (
            <TabPanel key={index}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5  ">
                <div
                  data-aos="fade-right"
                  className=" col-span-1   flex justify-center items-center "
                >
                  <div className="">
                    <h2 className="text-xl font-semibold text-center text-gray-800 capitalize lg:text-2xl ">
                      Recomendation for
                    </h2>
                    <div className="text-xl font-semibold text-center text-blue-800 capitalize lg:text-2xl my-4">
                      <div className="flex justify-center ">
                        <img
                          className="w-40 "
                          src={name.productImageURL}
                          alt=""
                        />
                      </div>
                      {name.productName}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 overflow-x-auto ">
                  <table
                    data-aos="fade-left"
                    className="table w-full border border-gray-300"
                  >
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="py-3 px-4">Image</th>
                        <th className="py-3 px-4">Product Name</th>
                        <th className="py-3 px-4">Query Title</th>
                        <th className="py-3 px-4">Reason</th>
                        <th className="py-3 px-4">Recommended By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recomendations
                        .filter(
                          (recomendation) =>
                            recomendation.productName === name.productName
                        )
                        .map((recomendation) => (
                          <tr
                            key={recomendation._id}
                            className="hover:bg-gray-100"
                          >
                            <td className="py-3 px-4">
                              <img
                                className="w-32 h-24 rounded-md"
                                src={recomendation.recommendedProductImage}
                                alt={recomendation.recommendedProductName}
                              />
                            </td>
                            <td className="py-3 px-4">
                              {recomendation.recommendedProductName}
                            </td>
                            <td className="py-3 px-4">
                              {recomendation.recommendationTitle}
                            </td>
                            <td className="py-3 px-4">
                              {recomendation.recommendationReason}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p>
                                  <strong>Name:</strong>{" "}
                                  {recomendation.recomenderName}
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {recomendation.recomenderEmail}
                                </p>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
          ))}
        </div>
        <div className="container mx-auto"></div>
      </Tabs>
    </div>
  );
};

export default RecommendationsForMe;
