// src/pages/Products.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Hardcoded Product Cards with Links for navigation */}
      <Link to="/product-details/1"> {/* Hardcoded product ID */}
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Nike Shoes"
          price="$120"
          description="High-quality running shoes"
          rating="⭐⭐⭐⭐"
          feedback="Very comfortable!"
        />
      </Link>
      <Link to="/product-details/2"> {/* Hardcoded product ID */}
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Apple iPhone 14"
          price="$999"
          description="Latest smartphone with great features"
          rating="⭐⭐⭐⭐⭐"
          feedback="Amazing performance!"
        />
      </Link>
      <Link to="/product-details/3"> {/* Hardcoded product ID */}
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Sony Headphones"
          price="$199"
          description="Noise-canceling wireless headphones"
          rating="⭐⭐⭐⭐"
          feedback="Great sound quality!"
        />
      </Link>
    </div>
  );
};

export default Products;
