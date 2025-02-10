import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import registerImage from "../assets/noExcuseLogo.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const nameRegex = /^[A-Za-z\s'-]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      console.log("Sending Register Data:", values);
      const response = await axios.post("http://localhost:8080/users/signup", values, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Register Response:", response.data);

      if (response.status === 201) {
        alert(response.data.message || "Account created successfully! Please log in.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center justify-center h-screen w-screen bg-amber-300 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-4">
          {/* Form Section */}
          <div className="flex-1 min-w-[300px]">
            <h3 className="text-2xl font-semibold text-center mb-2">Create an Account</h3>
            <p className="text-gray-600 text-center mb-6">Join for exclusive access!</p>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleRegister(Object.fromEntries(new FormData(e.target))); }} autoComplete="off">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">First Name</label>
                  <input name="firstName" className="w-full p-3 border rounded-lg" placeholder="John" required pattern="[A-Za-z\s'-]{2,}" title="Name cannot start with a number and must be at least 2 characters long." />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                  <input name="lastName" className="w-full p-3 border rounded-lg" placeholder="Doe" required pattern="[A-Za-z\s'-]{2,}" title="Name cannot start with a number and must be at least 2 characters long." />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input name="email" type="email" className="w-full p-3 border rounded-lg" placeholder="example@mail.com" required pattern="[^\s@]+@[^\s@]+\.[^\s@]+" title="Enter a valid email address." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City</label>
                  <input name="city" className="w-full p-3 border rounded-lg" placeholder="Enter your city" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone</label>
                  <input name="phone" type="tel" className="w-full p-3 border rounded-lg" placeholder="9876543210" required pattern="[6-9]\d{9}" title="Enter a valid 10-digit phone number." />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input name="password" type="password" className="w-full p-3 border rounded-lg" placeholder="********" required pattern="(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}" title="Password must be 8-20 characters, include at least one uppercase letter, one number, and one special character." />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-black py-3 rounded-lg hover:bg-blue-600 transition" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
              <p className="text-center mt-4">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link>
              </p>
            </form>
          </div>
          {/* Image Section */}
          <div className="flex-1 min-w-[300px] flex justify-center items-center">
            <motion.img
              src={registerImage}
              className="w-full max-w-xs rounded-lg object-cover"
              alt="Register"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
