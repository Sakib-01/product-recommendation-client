import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import TabCategory from "../components/TabCategory";
import Banner from "../components/Banner";
import Reviews from "./Reviews";
import Blogs from "../components/blog/Blogs";
import Newsletter from "../components/Newsletter";
import Offers from "../components/Offers";

const Home = () => {
  useEffect(() => {
    document.title = "ProRecco - Home";

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      {/* Banner */}
      <div data-aos="fade-up">
        <Banner />
      </div>

      {/* Tab Category */}
      <div className="bg-orange-50" data-aos="fade-up">
        <TabCategory />
      </div>

      {/* Blogs */}
      <div className="bg-orange-50" data-aos="fade-right">
        <Blogs />
      </div>

      {/* Reviews */}
      <div className="bg-slate-50" data-aos="fade-left">
        <Reviews />
      </div>

      {/* Newsletter */}
      <div data-aos="zoom-in">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
