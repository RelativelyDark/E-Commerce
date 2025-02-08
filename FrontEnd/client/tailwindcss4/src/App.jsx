import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer } from "./components";
import { Home, Profile, Cart, Order, Products } from "./pages";
import ProductDetails from "./pages/ProductDetails";
import { CategoriesProvider } from "./contextApi/CategoriesContext";

// Import Login & Register pages
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <CategoriesProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />

        <Routes>
          {/* Auth Pages (No Navbar & Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Pages with Navbar & Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow bg-amber-300">
                  <Routes>
                    <Route path="/" element={<Home />} /> {/* Redirect to Register first */}
                    <Route path="/products" element={<Products />} />
                    <Route path="/product-details/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </CategoriesProvider>
  );
}
