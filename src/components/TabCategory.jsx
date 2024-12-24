import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const TabCategory = () => {
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-queries`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime)
        );
        setQueries(sortedData);
      });
  }, []);
  const uniqueBrands = [...new Set(queries.map((query) => query.productBrand))];
  //   console.log(uniqueBrands);
  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse product By Product Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Browse product by categories. Click on the tabs below to explore
          products in each category.
        </p>

        <div className="flex items-center justify-center mb-6">
          <TabList className="flex items-center justify-center space-x-6 p-4 bg-gray-100 rounded-xl shadow-md">
            {["All", ...uniqueBrands].map((brand, index) => (
              <Tab
                key={index}
                className="px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 ease-in-out rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brand}
              </Tab>
            ))}
          </TabList>
        </div>

        {["All", ...uniqueBrands].map((brand, index) => (
          <TabPanel key={index}>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
              {queries
                .filter(
                  (query) => brand === "All" || query.productBrand === brand
                )
                .slice(0, 6)
                .map((query) => (
                  <ProductCard key={query._id} query={query}></ProductCard>
                ))}
            </div>
          </TabPanel>
        ))}
      </div>
      <div className="container mx-auto">
        <Link className=" flex justify-start mx-6" to="/queries">
          {" "}
          <button className=" btn btn-secondary">Show more..</button>
        </Link>
      </div>
    </Tabs>
  );
};

export default TabCategory;
