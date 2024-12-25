import React from "react";
import TabCategory from "../components/TabCategory";
import Banner from "../components/Banner";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <TabCategory />
      <Reviews />
    </div>
  );
};

export default Home;
