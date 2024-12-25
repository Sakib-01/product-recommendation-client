import React, { useEffect } from "react";
import TabCategory from "../components/TabCategory";
import Banner from "../components/Banner";
import Reviews from "./Reviews";
import Blogs from "../components/blog/Blogs";
import Newsletter from "../components/Newsletter";
import Offers from "../components/Offers";

const Home = () => {
  useEffect(() => {
    document.title = "ProRecco - Home";
  }, []);
  return (
    <div>
      <Banner />
      <div className="bg-orange-50">
        <TabCategory />
      </div>
      <div className="bg-orange-50">
        <Blogs />
      </div>
      <div className=" bg-slate-50">
        <Reviews />
      </div>
      <Newsletter />
    </div>
  );
};

export default Home;
