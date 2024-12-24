import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Website Name */}
        <div className="flex flex-col items-center md:items-center">
          {/* <img className="w-20" src={gameGear} alt="" /> */}
          <h2 className="text-2xl font-bold text-white mb-2">Ontoz</h2>
          <p className="text-sm">Your go-to place for the best Products.</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
          <p>Email: product@recommendation.com</p>
          <p>Phone: +880123456789</p>
          <p>Address: 123 product , Bangladesh</p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">
          &copy; 2024 ProductRecommendation. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
