import React from "react";

const HomeCard = ({ product }) => {
  return (
    <div className="bg-white py-2 px-2 shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-[100%] rounded-lg h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-lg mt-1"><span className="font-bold text-xl text-black">₹ </span>{product.price}</p>
        <button className="mt-3 w-full font-mono !bg-orange-400 text-black px-4 py-2 rounded-lg transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
