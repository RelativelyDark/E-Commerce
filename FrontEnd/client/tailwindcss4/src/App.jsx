import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components";
import { Home, Profile, Cart, Order, Products } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <ToastContainer position="bottom-right" />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}
