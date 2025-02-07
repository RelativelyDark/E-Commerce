import { React, useState, useEffect } from 'react'
import { Carousel, HomeCard } from '../components';
import { iqoo, tecno } from '../assets';


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("Authorization");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/product/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) throw new Error("Failed to fetch categories");

      const data = await resp.json();
      setCategories(data.data || []); // Ensure it's an array
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch products by category
  const fetchProducts = async () => {
    try {
      if (!categories.length) {
        console.log("Categories are empty, skipping fetchProducts.");
        return;
      }

      const productFetchPromises = categories.map(async (category) => {
        const response = await fetch(`http://localhost:8080/product/${category}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching products for ${category}`);
        }

        const products = await response.json();
        return { category, products };
      });

      const results = await Promise.all(productFetchPromises);

      // Convert results to an object { category: products.data }
      const data = results.reduce((acc, { category, products }) => {
        acc[category] = products.data || []; // Extract `data` array
        return acc;
      }, {});

      setProductsByCategory(data);
    } catch (err) {
      console.error("Error in fetchProducts:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length) {
      fetchProducts();
    }
  }, [categories]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col mt-24 px-8">
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{category}</h2>
          {products.length > 0 ? (
            <Carousel products={products} />
          ) : (
            <p className="text-gray-600">No products available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;