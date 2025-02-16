import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const ReviewsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const productName = new URLSearchParams(location.search).get("productName");

  const [reviews, setReviews] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState("");
  const [userNames, setUserNames] = useState({});

  // Function to extract the username before @
  const getUsername = (email) => {
    const [username] = email.split("@");
    return username;
  };

  // Fetch reviews
  useEffect(() => {
    setLoadingReviews(true);
    fetch(`http://localhost:8080/feedback/product/get/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched reviews:", data);
        if (Array.isArray(data)) {
          setReviews(data.slice(0, 4));

          // Get unique userIds
          const userIds = [...new Set(data.map((review) => review.userId))];
          
          // Fetch user names for each unique userId
          Promise.all(
            userIds.map((userId) =>
              fetch(`http://localhost:8080/user/get/${encodeURIComponent(userId)}`)
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(`Failed to fetch user name: ${res.status}`);
                  }
                  return res.json();
                })
                .then(() => ({ userId, name: getUsername(userId) })) // Extract username here
                .catch((err) => {
                  console.error("Error fetching user name:", err);
                  return { userId, name: getUsername(userId) }; // Extract username even on error
                })
            )
          )
            .then((userNamesArray) => {
              const namesMap = {};
              userNamesArray.forEach((user) => {
                namesMap[user.userId] = user.name;
              });
              setUserNames(namesMap);
            })
            .catch((err) => console.error("Error processing user names:", err));

        } else {
          throw new Error("Invalid response format");
        }
        setLoadingReviews(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError(err.message);
        setLoadingReviews(false);
      });
  }, [productId]);

  // Fetch product details
  useEffect(() => {
    setLoadingProduct(true);
    fetch(`http://localhost:8080/product/get/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched product details:", data);
        if (data.success && data.data) {
          setProductDetails(data.data); // Store the product data
        } else {
          throw new Error("Failed to fetch product details");
        }
        setLoadingProduct(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError(err.message);
        setLoadingProduct(false);
      });
  }, [productId]);

  if (loadingReviews || loadingProduct) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto text-black flex">
      {/* Left side: Product image */}
      <div className="w-1/2 pr-4">
        {productDetails ? (
          <img
            src={productDetails.image || "https://via.placeholder.com/300"}
            alt={productDetails.name || productName || "Product"}
            className="w-full max-w-sm h-full rounded shadow-md"
          />
        ) : (
          <p>Loading product image...</p>
        )}
      </div>

      {/* Right side: Reviews */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold"> 
          {productName || productDetails?.name || "Product"}
        </h2>

        <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
          Reviews
        </button>

        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="border-b pb-4">
                <strong>{userNames[review.userId]}</strong> - <span>{review.ratings} ★</span>
                <p>{review.comments}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
