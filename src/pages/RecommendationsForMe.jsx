import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RecommendationCard from "../components/RecommendationCard";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recomendations, setRecomendations] = useState(null); // State for the recomendations data
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecomendationsData();
  }, [user?.email]);

  const fetchRecomendationsData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/recommendation-for-me/${user?.email}`
      );
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
    ...new Set(
      recomendations.map((recomendation) => recomendation.productName)
    ),
  ];

  return (
    <div>
      <Tabs>
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl mb-5">
            Product Recommended By Other User
          </h1>
          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
            Check this Recommended products and make Best Choice for you!!
          </p>
          <div className="flex items-center justify-center mb-6">
            <TabList className="flex items-center justify-center space-x-6 p-4 bg-gray-100 rounded-xl shadow-md">
              {uniqueName.map((name, index) => (
                <Tab
                  key={index}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 ease-in-out rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
          </div>

          {uniqueName.map((name, index) => (
            <TabPanel key={index}>
              <h2 className="text-xl font-semibold text-center text-gray-800 capitalize lg:text-2xl ">
                Recomendation for{" "}
                <span className="text-xl font-semibold text-center text-blue-800 capitalize lg:text-2xl">
                  {name}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
                {recomendations
                  .filter((recomendation) => recomendation.productName === name)

                  .map((recomendation) => (
                    <RecommendationCard
                      key={recomendation._id}
                      recomendation={recomendation}
                      name={name}
                    ></RecommendationCard>
                  ))}
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
