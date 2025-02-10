import { useEffect, useState } from "react";

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
      <h1 style={styles.heading}>All Products</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p style={styles.price}>₹{product.price}</p>
            <p style={styles.seller}>Sold by: {product.seller}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  heading: { fontSize: "24px", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 products per row
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" },
  price: { fontWeight: "bold", color: "#007BFF" },
  seller: { fontSize: "12px", color: "#555" },
};

export default ProductsPage;
