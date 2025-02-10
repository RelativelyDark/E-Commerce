import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const HomeCard = ({ product }) => {

  const navigate = useNavigate();

  const [reqBody, setReqBody] = useState({
    productid: "",
    customerid: "",
    quantity: "",
  });

  const addToCart = async (id) => {
    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        console.error("No authorization token found");
        navigate("/login");
      }

      const userId = localStorage.getItem("userId");
      const productId = id;

      console.log("userId:", userId);
      console.log("productId:", productId);

      const newReqBody = {
        productid: productId,
        customerid: userId,
        quantity: 1,
      };
      setReqBody(newReqBody);

      const resp = await fetch(`http://localhost:8080/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReqBody),
      });

      if (!resp.ok) throw new Error("Failed to add item to cart");

      console.log("Item added successfully"); 
      navigate("/cart");
    } catch (error) {
      console.error("Error adding items to cart", error);
    }
  };

  return (
    <div className="bg-white py-2 px-2 shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={product.image}
        alt={product.name}
        className="w-[100%] rounded-lg h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-lg mt-1">
          <span className="font-bold text-xl text-black">₹ </span>
          {product.price}
        </p>
        <button
          className="mt-3 w-full font-mono !bg-orange-400 text-black px-4 py-2 rounded-lg transition-all"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
