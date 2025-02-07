import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-600 !text-white py-6 px-4 text-center mt-auto">
      <div className="flex justify-center gap-8 ml-106 mr-106 mb-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/about" className="hover:text-blue-400">About Us</Link>
        <Link to="/terms" className="hover:text-blue-400">Terms of Use</Link>
        <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
      </div>
      

      <p className="text-orange-400 font-bold">
        © All rights reserved | Powered by <span className="text-blue-400">No Excuse</span>
      </p>
    </footer>
  );
};

export default Footer;
