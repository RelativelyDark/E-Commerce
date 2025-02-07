import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components";
import { Home, Profile, Cart, Order, Products } from "./pages";
import ProductDetails from "./pages/ProductDetails"; // Import ProductDetails

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <ToastContainer position="bottom-right" />


      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}
