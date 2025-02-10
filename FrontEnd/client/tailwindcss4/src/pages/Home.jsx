import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "../components";
import { iphone } from "../assets";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const token = localStorage.getItem("Authorization");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/product/all`, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
      });

      if (!resp.ok) throw new Error("Failed to fetch all products");

      const response = await resp.json();
      setProducts(response.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getRandomProducts = (count) => {
    if (!products.length) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const newArrivals = getRandomProducts(5);
  const mostBought = getRandomProducts(5);

  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex flex-col bg-black rounded-3xl md:flex-row items-center justify-between mt-20 mr-16 ml-16 py-4">
        <div className="space-y-4 px-20 py-20">
          <h1 className="text-5xl text-orange-400 font-mono">iPhone 16</h1>
          <h4 className="text-gray-500 text-8xl font-sans">SMARTPHONE</h4>
          <h3 className="py-4 font-sans text-3xl text-white mb-10">Think different</h3>
          <Link
            to="/products"
            className="mt-20 font-sans font-bold text-lg bg-orange-400 !text-black px-4 py-2 rounded-lg transition-all hover:bg-amber-500 shadow-md"
          >
            Shop now
          </Link>
        </div>
        <img src={iphone} alt="iphone16" className="w-88" />
      </div>

      <div className="flex flex-col mt-16 px-8">
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading products...</p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-sans font-bold mb-0 text-black ml-10 mr-12">
                New Arrivals
              </h2>
              {newArrivals.length > 0 ? (
                <Carousel products={newArrivals} />
              ) : (
                <p className="text-gray-600">No new arrivals available.</p>
              )}
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-sans font-bold mb-0 text-black ml-10 mr-12">
                Best Seller
              </h2>
              {mostBought.length > 0 ? (
                <Carousel products={mostBought} />
              ) : (
                <p className="text-gray-600">No Best seller products available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
