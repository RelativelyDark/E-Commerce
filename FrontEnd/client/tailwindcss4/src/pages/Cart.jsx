import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const customerId = "3435"; 

  const fetchCartItems = async () => {
    const token = localStorage.getItem("Authorization"); 
   
    try {
      // Step 1: Fetch cart data
      const response = await fetch(`http://localhost:8080/cart/3435`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const cartData = await response.json();
      console.log(cartData);

      // Step 2: Fetch product details for each product ID
      const productsWithDetails = await Promise.all(
        cartData.map(async (item) => {
          const productResponse = await fetch(
            `http://localhost:8080/product/get/${item.productid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Attach Bearer token for product details
                "Content-Type": "application/json",
              },
            }
          );

          if (!productResponse.ok) {
            throw new Error(
              `Failed to fetch product details for product ID: ${item.productid}`
            );
          }

          const productData = await productResponse.json();
          return { ...productData.data, quantity: item.quantity }; // Merge product details with quantity
        })
      );

      console.log(productsWithDetails);

      // Step 3: Set final cart items
      setCartItems(productsWithDetails);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col md:flex-row justify-between pt-40 pl-10 pb-30 pr-10 gap-6">
      <div className="flex-1 bg-white p-1 shadow-lg rounded-lg h-[500px] w-2 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
        <p className="text-lg font-medium text-black">Total: ${totalAmount}</p>
        <button className="w-full mt-4 bg-blue-200 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
