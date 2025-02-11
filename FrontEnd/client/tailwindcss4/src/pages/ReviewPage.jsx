import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const ReviewsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const productName = new URLSearchParams(location.search).get("productName"); // Extract product name from URL

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/feedback/product/get/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched reviews:", data);

        // Since response is an array, directly set it to state
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          throw new Error("Invalid response format");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto text-black">
      {/* Dynamically update heading with the product name */}
      <h2 className="text-2xl font-bold">Reviews for {productName || "Product"}</h2>

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="border-b pb-4">
              <strong>{review.userId}</strong> - <span>{review.ratings} ★</span>
              <p>{review.comments}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsPage;
