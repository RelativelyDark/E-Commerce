import React from "react";

const CartCard = ({ item }) => {
  return (
    <div className="flex items-center border-b pb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-30 h-30 object-cover rounded-lg"
      />
      <div className="ml-15">
        <h3 className="text-lg font-medium text-black">{item.name}</h3>
        <p className="text-black">${item.price}</p>
        <p className="text-black">Quantity: {item.quantity}</p>
      </div>
    </div>
  );
};

export default CartCard;
