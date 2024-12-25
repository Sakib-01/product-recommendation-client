import React from "react";
import appStoreLogo from "../assets/img/App-Store.png";
import playStoreLogo from "../assets/img/Google_Play_Store.png";

const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Newsletter Subscription Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Us!</h2>
          <p className="text-lg mb-6">
            Subscribe to our newsletter and never miss the latest reviews,
            deals, and tech tips.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-md mb-4 md:mb-0"
            />
            <button className="btn btn-primary md:ml-2">Subscribe</button>
          </div>
        </div>

        {/* Mobile App Promotion Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
          <p className="text-lg mb-6">
            Enjoy seamless access to product reviews and exclusive deals,
            anytime, anywhere.
          </p>
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={appStoreLogo} alt="App Store" className="w-36" />
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noreferrer">
              <img src={playStoreLogo} alt="Play Store" className="w-36" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
