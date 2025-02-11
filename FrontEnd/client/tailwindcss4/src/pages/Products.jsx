import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/product/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data); // Assuming products are inside `data.data`
        } else {
          setError("Failed to fetch products");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {products.map((product) => (
          <Link key={product.id} to={`/product/get/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={styles.card}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3>{product.name}</h3>
              <p style={styles.price}>₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center", backgroundColor: "black", margin: "80px 80px 0" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center" },
  card: { border: "1px solid #ddd", borderRadius: "8px", padding: "8px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", textAlign: "center", backgroundColor: "#ffffff", width: "250px", height: "250px" },
  image: { width: "100%", height: "130px", objectFit: "cover", borderRadius: "8px" },
  price: { fontWeight: "bold", color: "#007BFF" },
};

export default ProductsPage;
