import React from "react";

const CartCard = ({ item, updateCartQuantity, deleteCartItem }) => {
  return (
    <div className="flex items-center bg-gray-100 pt-4 pb-4 pl-4 pr-4 rounded-lg shadow-md">
    
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      )}


      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-black">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-gray-700 font-medium">Price: <span className="font-bold text-l text-black">₹ </span>{item.price.toFixed(2)}</p>
      </div>

    
      <div className="flex items-center space-x-4">
 
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700"
          onClick={() => updateCartQuantity(item.productid, item.quantity - 1)}
        >
          -
        </button>

    
        <span className="mx-2 text-lg font-semibold text-black">{item.quantity}</span>

        <button
          className="bg-green-500 text-white px-2 py-1 rounded-s hover:bg-green-700"
          onClick={() => updateCartQuantity(item.productid, item.quantity + 1)}
        >
          +
        </button>

        <button
          className="!bg-red-700 text-white px-2 py-1 !rounded-lg hover:!bg-red-900"
          onClick={() => deleteCartItem(item.productid)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartCard;
