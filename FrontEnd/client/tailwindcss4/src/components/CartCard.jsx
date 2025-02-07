import React from "react";

const CartCard = ({ item, updateCartQuantity, deleteCartItem }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-black">{item.name}</h3>
        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center">
        {/* Decrease quantity button */}
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700"
          onClick={() => updateCartQuantity(item.productid, item.quantity - 1)}
        >
          -
        </button>

        <span className="mx-2 text-lg font-semibold text-black">{item.quantity}</span>

        {/* Increase quantity button */}
        <button
          className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-700"
          onClick={() => updateCartQuantity(item.productid, item.quantity + 1)}
        >
          +
        </button>

        {/* Delete item button */}
        <button
          className="bg-red-700 text-white px-2 py-1 ml-4 rounded-lg hover:bg-red-900"
          onClick={() => deleteCartItem(item.productid)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartCard;
