import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Carousel, HomeCard } from '../components';
import { iphone, iqoo, tecno } from '../assets';


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
    <div>
      <div className="flex flex-col bg-black rounded-3xl md:flex-row items-center justify-between mt-20 mr-16 ml-16  py-4">
        <div className="space-y-4 px-20 py-20">
          <h1 className="text-5xl text-orange-400">
            iPhone 16
          </h1>
          <h4 className="text-gray-500 text-8xl font-sans">SMARTPHONE</h4>
          <h3 className="py-4 text-3xl text-white mb-10">Think different</h3>
          <Link
            to="/products"
            className="mt-20 font-sans font-bold text-lg bg-orange-400 !text-black px-4 py-2 rounded-lg transition-all hover:bg-amber-500 shadow-md"
          >
            Shop now
          </Link>
        </div>
        <img
          src={iphone}
          alt="iphone16"
          className="w-88"
        />
      </div>

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
    </div>

  );
};

export default Home;