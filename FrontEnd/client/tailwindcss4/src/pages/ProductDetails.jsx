import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";


const ProductDetails = () => {
  const { id } = useParams();
  const reviewsRef = useRef(null);

  const product = {
    id: id,
    name: "Textured-knit Sweater",
    description:
      "Long-sleeved sweater in a soft, textured-knit cotton blend with ribbing at neckline, cuffs, and hem.",
    price: "$34.99",
    originalPrice: "$49.99",
    images: [s1, s1, s2, s1, s2, s1], // Main image is s1, thumbnails are s1, s2, s3, s4, s5
    rating: "⭐⭐⭐⭐⭐",
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const reviews = [
    { user: "Alice", review: "Very comfortable and stylish!" },
    { user: "Bob", review: "Great quality, totally worth it!" },
  ];

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto text-black">
      {/* Product Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex">
          {/* Thumbnail Images */}
          <div className="flex flex-col h-96 relative mr-2 overflow-hidden">
          <button onClick={prevImage} className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-transparent text-white opacity-50 p-2">▲</button>
            <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {product.images.slice(1).map((img, index) => (
                <img
                  key={index + 1}
                  src={img}
                  alt="Thumbnail"
                  className={`w-16 h-16 object-cover cursor-pointer mt-1 rounded ${selectedImage === index + 1 ? "border-2 border-blue-500" : ""}`}
                  onClick={() => setSelectedImage(index + 1)}
                />
              ))}
            </div>
            <button onClick={nextImage} className="absolute  bottom-13 left-1/2 transform -translate-x-1/2 bg-transparent text-white opacity-50 p-2">▼</button>
          </div>
          {/* Main Image */}
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-2/3 h-auto rounded"
          />
        </div>
        <div className="space-y-4">
          <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">Sale</span>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl font-semibold">
            <span className="line-through text-gray-500">{product.originalPrice}</span> {product.price}
          </p>
          <p className="text-yellow-500">{product.rating}</p>
          <p className="text-sm text-gray-700">{product.description}</p>

          <div className="flex gap-2">
            <button className="bg-blue-500 text-black px-4 py-2 rounded">Buy Now</button>
            <button className="bg-gray-300 px-4 py-2 rounded">Add to Cart</button>
            <button onClick={scrollToReviews} className="bg-gray-200 px-3 py-2 rounded">★ Read Reviews</button>
          </div>
        </div>
      </div>

       {/* Reviews Section */}
       <div ref={reviewsRef} className="mt-12">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Reviews</h3>
          <div className="flex gap-2">
            <button className="bg-gray-500 text-black px-3 py-1 rounded">Edit</button>
            <button className="bg-blue-500 text-black px-3 py-1 rounded">Submit</button>
          </div>
        </div>
        <textarea
          placeholder="Write your review..."
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />

        <div className="mt-4 space-y-2">
          {reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <strong>{review.user}</strong>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
