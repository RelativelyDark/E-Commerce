import React from "react";

const HomeCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">₹{product.price}</p>
        <button className="mt-3 w-full bg-blue-600 text-black py-2 rounded-lg text-sm font-medium transition hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
