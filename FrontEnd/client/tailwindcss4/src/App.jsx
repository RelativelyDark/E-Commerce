import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer } from "./components";
import { Home, Profile, Cart, Order, Products } from "./pages";

export default function App() {
  return (
      <BrowserRouter className="flex flex-col min-h-screen">
      <Navbar />

      <ToastContainer position="bottom-right" />

      <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

      <Footer />
    </BrowserRouter>
  );
}
