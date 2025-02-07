// src/pages/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL

  // Hardcoded product data for testing
  const product = {
    id: id, // Set dynamic product ID from URL
    name: "Nike Shoes",
    description: "High-quality running shoes with great support.",
    price: "$120",
    rating: "⭐⭐⭐⭐",
    feedback: "Very comfortable and stylish!",
    img: "https://via.placeholder.com/150",
  };

  return (
    <div className="p-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Half - Product Details */}
      <div className="flex flex-col space-y-4">

        <div>
        <img src={product.img} alt={product.name} className="w-64 h-64 object-cover" />
        </div>

        <div>
          <label className="block text-sm">Quantity</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-2">
  <button
    style={{
      backgroundColor: "yellow",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
     Add to Cart
  </button>

  <button
    style={{
      backgroundColor: "orange",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
     Buy Now
  </button>
</div>


      </div>

      {/* Right Half - Actions & Feedback */}
      <div className="flex flex-col space-y-4">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-xl text-gray-800">{product.price}</p>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-yellow-500">{product.rating}</p>
        </div>
        

        <div>
          <h3 className="text-lg font-medium">Feedback</h3>
          <p className="text-gray-600">{product.feedback}</p>
        </div>

        <div className="mt-4">
        <textarea
        placeholder="Write your feedback..."
        className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-2 mt-2">
        <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded">
      📤
    </button>
    <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded">
      ✏️
    </button>
        </div>

       
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
