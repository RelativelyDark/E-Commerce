import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Importing icons
import loginImage from "../assets/noExcuseLogo.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/users/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        localStorage.setItem("Authorization", "Bearer " + response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center justify-center h-screen w-screen bg-gray-400 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.img
              src={loginImage}
              alt="Login"
              className="w-full max-w-sm rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="w-full md:w-1/2 p-4">
            <h3 className="text-black text-center text-2xl font-semibold">Sign In</h3>
            <p className="text-center text-black mb-4">Welcome back! Please log in.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="example@mail.com"
                  required
                />
              </div>

              {/* Password with Show/Hide Toggle */}
              <div className="relative">
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-black w-full p-2 border border-gray-300 rounded-lg pr-12"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-black p-2 rounded-lg hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
            <p className="text-black text-center mt-4">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
