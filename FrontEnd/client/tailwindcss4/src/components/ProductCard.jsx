// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ image, name, price, description, rating, feedback }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      
      <p className="text-sm mt-1">{description}</p>
      <p className="text-yellow-500 mt-1">{rating}</p>

      <p className="text-gray-600">{price}</p>
      {/* <p className="text-gray-500 text-sm">{feedback}</p> */}
      {/* <div className="mt-3 flex gap-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Add to Cart
        </button>
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          Buy Now
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
