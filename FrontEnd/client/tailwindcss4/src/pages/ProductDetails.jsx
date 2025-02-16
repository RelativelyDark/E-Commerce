import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CategoriesContext } from "../contextApi/CategoriesContext";
import { jwtDecode } from "jwt-decode";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: categories, success } = useContext(CategoriesContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5); // Default rating
  const [userName, setUserName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [reqBody, setReqBody] = useState({});

  // Fetch product details on component mount
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

  // Function to fetch user details (ID & first name)
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        throw new Error("Authorization token not found. Please log in.");
      }

      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      const userId = decodedToken?.userId || decodedToken?.id || decodedToken?.sub;
      const firstName = decodedToken?.firstName || "User"; // Default if missing

      if (!userId) throw new Error("User ID not found in token.");

      return { userId, firstName };
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  // Fetch and store user name on mount
  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await fetchUserDetails();
      if (userDetails) {
        setUserName(userDetails.firstName);
      }
    };
    fetchUser();
  }, []);

  // Feedback submission handler
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const userDetails = await fetchUserDetails();
      if (!userDetails) {
        setSubmitError("User not found! Please log in.");
        return;
      }

      const token = localStorage.getItem("Authorization");
      if (!token) {
        setSubmitError("Authentication token missing. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          comments: feedback,
          ratings: rating,
          userId: userDetails.userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit feedback. Status: ${response.status}`);
      }

      setSubmitSuccess("Feedback submitted successfully!");
      setFeedback("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitError("Failed to submit feedback. Please try again.");
    }
  };

  // Add to Cart Functionality from Second Code
  const addToCart = async (id) => {
    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        console.error("No authorization token found");
        navigate("/login");
      }

      const userId = localStorage.getItem("userId");
      const productId = id;

      console.log("userId:", userId);
      console.log("productId:", productId);

      const newReqBody = {
        productid: productId,
        customerid: userId,
        quantity: 1,
      };
      setReqBody(newReqBody);

      const resp = await fetch(`http://localhost:8080/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReqBody),
      });

      if (!resp.ok) throw new Error("Failed to add item to cart");

      console.log("Item added successfully");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding items to cart", error);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>No product data available.</p>;

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-100 max-w-sm h-104 rounded shadow-md"
          />
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
                {categories.map((category, index) =>
                  typeof category === "string" ? (
                    <li key={index}>{category}</li>
                  ) : (
                    <li key={category.id}>{category.name}</li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 transition">
              Buy Now
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
            <button
              onClick={() =>
                navigate(`/reviews/${product.id}?productName=${encodeURIComponent(product.name)}`)
              }
              className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 transition"
            >
              ★ Read Reviews
            </button>
          </div>

          {/* Feedback Submission Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold">Write a Review</h3>
            {/* <p>Reviewing as: <strong>{userName}</strong></p> */}

            {/* Star Rating UI */}
            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full p-2 border rounded mt-2 focus:ring focus:ring-blue-300"
              rows="3"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              onClick={handleSubmitFeedback}
              className="mt-2 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition"
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
