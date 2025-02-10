import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userid =    localStorage.getItem("userId"); // Replace with dynamic user ID if needed

  const fetchOrders = async () => {
    if (!userid) {
      console.error("User ID not found.");
      return;
    }

    const token = localStorage.getItem("Authorization");

    try {
      // Step 1: Fetch orders for the customer
      const response = await fetch(`http://localhost:8080/orders/${userid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`);
      }

      const ordersData = await response.json();

      // Step 2: Fetch product details for each order item
      const ordersWithProducts = await Promise.all(
        ordersData.map(async (order) => {
          const productResponse = await fetch(
            `http://localhost:8080/product/get/${order.productid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!productResponse.ok) {
            throw new Error(`Failed to fetch product for ID: ${order.productid}`);
          }

          const productData = await productResponse.json();

          return { ...productData.data, quantity: order.quantity };
        })
      );

      setOrders(ordersWithProducts);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mt-20 mb-6">Order History</h1>

      {/* Orders List */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col md:flex-row items-center p-4 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-200 rounded-md"
            >
              <img
                src={order.image || "https://via.placeholder.com/150"}
                alt={order.productName}
                className="w-24 h-24 object-cover rounded-lg md:mr-4"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-semibold text-gray-800">{order.productName}</h2>
                <p className="text-gray-600">{order.description}</p>
                <span className="text-blue-600 font-bold">${order.price.toFixed(2)}</span>
                <span className="ml-4 text-gray-500">Qty: {order.quantity}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
