import React, { useEffect, useState, useMemo } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userid = localStorage.getItem("userId");

  const fetchOrders = async () => {
    if (!userid) {
      console.error("User ID not found.");
      return;
    }

    const token = localStorage.getItem("Authorization");

    try {
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

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;

    const searchLower = searchTerm.toLowerCase().trim();
    return orders.filter(order =>
      order.productName?.toLowerCase().includes(searchLower) ||
      order.description?.toLowerCase().includes(searchLower) ||
      order.price.toString().includes(searchLower) ||
      order.quantity.toString().includes(searchLower)
    );
  }, [searchTerm, orders]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Order History</h1>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search by product name, description, price or quantity..."
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="bg-white rounded-lg shadow">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border-b last:border-b-0 p-4 transition-all duration-300 ease-in-out transform 
                  hover:scale-102 hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-50 
                  rounded-lg relative overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-0 
                  transition-opacity duration-300 hover:opacity-100 blur-xl z-0"></div>

                <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
                  <img
                    src={order.image || "https://via.placeholder.com/150"}
                    alt={order.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{order.productName}</h2>
                    <p className="text-gray-600">{order.description}</p>
                    <div className="mt-2">
                      <span className="text-blue-600 font-bold">
                        ₹{order.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="ml-4 text-gray-500">Qty: {order.quantity}</span>
                      <span className="ml-4 text-gray-500">
                        Total: ₹{(order.price * order.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                {orders.length === 0
                  ? "No orders found."
                  : `No products found matching "${searchTerm}"`}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-blue-500 hover:text-blue-600"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
