import React from "react";
import adImage from "../assets/img/banner3.jpg";

const Offers = () => {
  return (
    <div className="bg-yellow-400 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Call-Out Banner Section */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Exclusive Deals You Can't Miss!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Shop now and save big on the latest tech accessories. Limited time
            only!
          </p>
          <button className="btn btn-primary">Shop Now</button>
        </div>

        {/* Ad Section */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <img
              src={adImage}
              alt="Advertisement"
              className="rounded-lg shadow-lg w-80"
            />
            {/* Optional: Animated Ad Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white text-xl font-semibold">Special Offer!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
