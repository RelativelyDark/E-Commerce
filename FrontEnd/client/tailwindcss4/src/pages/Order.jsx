import React, { useState, useEffect, useMemo } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 1,
          productName: "Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation.",
          price: 99.99,
          quantity: 1,
          image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6029/6029025_rd.jpg",
        },
        {
          id: 2,
          productName: "Smart Watch",
          description: "Latest model smart watch with multiple features.",
          price: 199.99,
          quantity: 2,
          image: "https://i5.walmartimages.com/asr/e1ae90b2-98da-443b-888c-a71228c5234e.eb10d07052b374f38aa17166043f5a7a.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
        },
        {
          id: 3,
          productName: "Bluetooth Speaker",
          description: "Portable Bluetooth speaker with excellent sound quality.",
          price: 49.99,
          quantity: 3,
          image: "https://th.bing.com/th/id/OIP.g-IXaRH2deMRDkasq9BDFQHaHa?rs=1&pid=ImgDetMain",
        },
      ];
      setTimeout(() => setOrders(mockOrders), 500);
    };

    fetchOrders();
  }, []);

  // Filter orders based on search input
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(
      (order) =>
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mt-20 mb-6">Order History</h1>

      {/* Search Bar */}
      <input
  type="text"
  placeholder="Search orders..."
  className="w-full max-w-lg p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-sm text-black placeholder-gray-500"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>


      {/* Orders List */}
      <div className="w-full max-w-6xl mt-6 bg-white rounded-lg shadow-lg p-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col md:flex-row items-center p-4 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-200 rounded-md"
            >
              <img
                src={order.image}
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
