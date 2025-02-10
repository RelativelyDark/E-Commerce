import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="font-bold text-lg mt-2">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold text-xl mt-1">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
