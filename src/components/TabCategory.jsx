import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductCard from "./ProductCard";

const TabCategory = () => {
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-queries`)
      .then((res) => res.json())
      .then((data) => setQueries(data));
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

        <div className="flex items-center justify-center">
          <TabList>
            {uniqueBrands.map((brand, index) => (
              <Tab key={index}>{brand}</Tab>
            ))}
          </TabList>
        </div>

        {uniqueBrands.map((brand, index) => (
          <TabPanel key={index}>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {queries
                .filter((query) => query.productBrand === brand)
                .map((query) => (
                  <ProductCard key={query._id} query={query}></ProductCard>
                ))}
            </div>
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default TabCategory;
