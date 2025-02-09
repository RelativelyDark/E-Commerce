import React, { useState } from "react";
import { Card, Form, Input, Typography, Button, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import loginImage from "../assets/noExcuseLogo.jpg";
import "../styles/auth.css";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log("Sending Login Data:", values); // Debugging Log
      const response = await axios.post("http://localhost:8080/users/login", values, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login Response:", response.data); // Debugging Log

      if (response.status === 200) {
        message.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      message.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="auth-container">
      <Card className="form-container">
        <Row gutter={[24, 24]} align="middle">
          {/* Image on the Left */}
          <Col xs={24} md={12} className="image-section">
            <motion.img
              src={loginImage}
              className="auth-image"
              alt="Login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Col>

          {/* Form on the Right */}
          <Col xs={24} md={12}>
            <div className="form-section">
              <Typography.Title level={3} className="title">Sign In</Typography.Title>
              <Typography.Text type="secondary" className="slogan">Welcome back! Please log in.</Typography.Text>
              <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required!" },
                    { type: "email", message: "Enter a valid email address!" },
                  ]}
                >
                  <Input size="large" placeholder="example@mail.com" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required!" }]}
                >
                  <Input.Password size="large" placeholder="********" />
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" size="large" className="btn" loading={loading} block>
                    Log In
                  </Button>
                </Form.Item>

                {/* 👇 Sign-Up Link at Bottom */}
                <Typography.Text className="text-center">
                  Don't have an account?{" "}
                  <Link to="/register">
                    <Button type="link">Sign Up</Button>
                  </Link>
                </Typography.Text>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
};

export default Login;
