// import React, { useEffect, useState } from "react";
// import CartCard from "../components/CartCard";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const customerId = "3435"; 

//   const fetchCartItems = async () => {
//     const token = localStorage.getItem("Authorization"); 

//     try {
//       const response = await fetch(`http://localhost:8080/cart/${customerId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const cartData = await response.json();
//       console.log(cartData);

//       const productsWithDetails = await Promise.all(
//         cartData.map(async (item) => {
//           const productResponse = await fetch(
//             `http://localhost:8080/product/get/${item.productid}`,
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${token}`, 
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (!productResponse.ok) {
//             throw new Error(
//               `Failed to fetch product details for product ID: ${item.productid}`
//             );
//           }

//           const productData = await productResponse.json();
//           return { ...productData.data, quantity: item.quantity, productid: item.productid }; 
//         })
//       );

//       console.log(productsWithDetails);
//       setCartItems(productsWithDetails);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   // Function to update quantity
//   const updateCartQuantity = async (productid, quantity) => {
//     const token = localStorage.getItem("Authorization");

//     if (quantity < 1) return; // Prevent quantity from going below 1

//     try {
//       const response = await fetch(`http://localhost:8080/cart`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           customerid: customerId,
//           productid: productid,
//           quantity: quantity,
//         }),
//       });

//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Failed to update cart item. Status: ${response.status}`);
//       }

//       console.log(`Updated product ${productid} to quantity ${quantity}`);

//       // Refresh cart items after update
//       fetchCartItems();
//     } catch (error) {
//       console.error("Error updating cart item:", error);
//     }
//   };

//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="flex flex-col md:flex-row justify-between pt-40 pl-10 pb-30 pr-10 gap-6">
//       <div className="flex-1 bg-white p-1 shadow-lg rounded-lg h-[500px] w-2 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <CartCard key={item.productid} item={item} updateCartQuantity={updateCartQuantity} />
//           ))}
//         </div>
//       </div>

//       <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
//         <p className="text-lg font-medium text-black">Total: ${totalAmount.toFixed(2)}</p>
//         <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const customerId = "3435"; 

  const fetchCartItems = async () => {
    const token = localStorage.getItem("Authorization"); 

    try {
      const response = await fetch(`http://localhost:8080/cart/${customerId}`, {
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

      const productsWithDetails = await Promise.all(
        cartData.map(async (item) => {
          const productResponse = await fetch(
            `http://localhost:8080/product/get/${item.productid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, 
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
          return { ...productData.data, quantity: item.quantity, productid: item.productid }; 
        })
      );

      console.log(productsWithDetails);
      setCartItems(productsWithDetails);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Function to update quantity
  const updateCartQuantity = async (productid, quantity) => {
    const token = localStorage.getItem("Authorization");

    if (quantity < 1) return; // Prevent quantity from going below 1

    try {
      const response = await fetch(`http://localhost:8080/cart`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid: customerId,
          productid: productid,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update cart item. Status: ${response.status}`);
      }

      console.log(`Updated product ${productid} to quantity ${quantity}`);

      // Refresh cart items after update
      fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Function to delete an item from the cart
  const deleteCartItem = async (productid) => {
    const token = localStorage.getItem("Authorization");

    try {
      const response = await fetch(`http://localhost:8080/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid: customerId,
          productid: productid,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete cart item. Status: ${response.status}`);
      }

      console.log(response);

      console.log(`Deleted product ${productid} from cart`);

      // Refresh cart items after deletion
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row justify-between pt-40 pl-10 pb-30 pr-10 gap-6">
      <div className="flex-1 bg-white p-1 shadow-lg rounded-lg h-[500px] w-2 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartCard 
              key={item.productid} 
              item={item} 
              updateCartQuantity={updateCartQuantity} 
              deleteCartItem={deleteCartItem} 
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
        <p className="text-lg font-medium text-black">Total: ${totalAmount.toFixed(2)}</p>
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;

