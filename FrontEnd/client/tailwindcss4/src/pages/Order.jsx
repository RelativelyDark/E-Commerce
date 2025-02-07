// OrderHistory.js
import React, { useState, useEffect, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// A memoized OrderCard component to avoid unnecessary re-renders.
const OrderCard = React.memo(({ order }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white">
      <img
        src={order.image}
        alt={order.productName}
        className="w-32 h-32 object-cover rounded-md mr-4"
        loading="lazy" // Native lazy-loading for images.
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-1">{order.productName}</h2>
        <p className="text-gray-600 mb-2">{order.description}</p>
        <div className="flex justify-between max-w-xs">
          <span className="font-bold text-gray-800">${order.price.toFixed(2)}</span>
          <span className="text-gray-500">Qty: {order.quantity}</span>
        </div>
      </div>
    </div>
  );
});

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching orders from an API.
  useEffect(() => {
    const fetchOrders = async () => {
      // Replace this with your real API call.
      const mockOrders = [
        {
          id: 1,
          productName: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation.',
          price: 99.99,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          productName: 'Smart Watch',
          description: 'Latest model smart watch with multiple features.',
          price: 199.99,
          quantity: 2,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          productName: 'Bluetooth Speaker',
          description: 'Portable Bluetooth speaker with excellent sound quality.',
          price: 49.99,
          quantity: 3,
          image: 'https://via.placeholder.com/150',
        },
        // ... add more orders as needed.
      ];

      // Simulate network delay.
      setTimeout(() => {
        setOrders(mockOrders);
      }, 500);
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term.
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(order =>
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  // Row renderer for react-window.
  const Row = ({ index, style }) => {
    const order = filteredOrders[index];
    return (
      <div style={style} key={order.id}>
        <OrderCard order={order} />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="h-[70vh] border border-gray-300 rounded-md">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={filteredOrders.length}
              itemSize={150} // Adjust this size based on your card's height.
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default OrderHistory