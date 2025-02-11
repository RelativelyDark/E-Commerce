import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CategoriesContext } from "../contextApi/CategoriesContext"; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: categories, success } = useContext(CategoriesContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/product/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product API Response:", data);
        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details");
        setLoading(false);
      });
  }, [id]);

  // Function to fetch user ID dynamically
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("Authorization"); // Correct token key
  
      if (!token) throw new Error("User not logged in");
  
      const response = await fetch("http://localhost:8080/users/display/${id}", {  // Replace with correct endpoint
        headers: {
          "Authorization": token,  // Ensure correct token usage
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error(`Failed to fetch user data. Status: ${response.status}`);
  
      const data = await response.json();
      console.log("Fetched user data:", data);
      return data.userId; 
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };
  
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
  
    try {
      const userId = await fetchUserId(); // Fetch user ID dynamically
      if (!userId) {
        setSubmitError("User not found! Please log in.");
        return;
      }
  
      const token = localStorage.getItem("Authorization"); // Ensure correct token key
      if (!token) {
        setSubmitError("Authentication token missing. Please log in again.");
        return;
      }
  
      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token, // Use the correct stored token
        },
        body: JSON.stringify({
          productId: id,
          comments: feedback,
          ratings: 5,
          userId: userId,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit feedback. Status: ${response.status}`);
      }
  
      setSubmitSuccess("Feedback submitted successfully!");
      setFeedback(""); // Clear input field
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitError("Failed to submit feedback. Please try again.");
    }
  };
  

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>No product data available.</p>;

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex">
          <img src={product.image} alt={product.name} className="w-2/3 h-auto rounded" />
        </div>
        <div className="space-y-4">
          <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">Sale</span>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-sm text-gray-700">{product.description}</p>

          {categories && success && (
            <div>
              <h3 className="text-lg font-semibold">Categories:</h3>
              <ul>
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            <button className="bg-blue-500 text-black px-4 py-2 rounded">Buy Now</button>
            <button className="bg-gray-300 px-4 py-2 rounded">Add to Cart</button>
            <button 
              onClick={() => navigate(`/reviews/${product.id}?productName=${encodeURIComponent(product.name)}`)}
              className="bg-gray-200 px-3 py-2 rounded"
            >
              ★ Read Reviews
            </button>
          </div>

          {/* Feedback Submission Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Write a Review</h3>
            <textarea
              className="w-full p-2 border rounded mt-2"
              rows="3"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button 
              onClick={handleSubmitFeedback}
              className="mt-2 bg-green-500 text-black px-4 py-2 rounded"
            >
              Submit Review
            </button>

            {/* Display success or error message */}
            {submitSuccess && <p className="text-green-600 mt-2">{submitSuccess}</p>}
            {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
