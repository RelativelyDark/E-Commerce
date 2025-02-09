import React, { useState } from "react";
import { Card, Form, Input, Typography, Button, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import registerImage from "../assets/noExcuseLogo.jpg";
import "../styles/auth.css";

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
        message.success(response.data.message || "Account created successfully! Please log in.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="auth-container">
      <Card className="form-container">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <div className="form-section">
              <Typography.Title level={3} className="title">Create an Account</Typography.Title>
              <Typography.Text type="secondary" className="slogan">Join for exclusive access!</Typography.Text>
              <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        { required: true, message: "First name is required!" },
                        { pattern: nameRegex, message: "Enter a valid first name (only letters & spaces)" },
                      ]}
                    >
                      <Input size="large" placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        { required: true, message: "Last name is required!" },
                        { pattern: nameRegex, message: "Enter a valid last name (only letters & spaces)" },
                      ]}
                    >
                      <Input size="large" placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required!" },
                    { pattern: emailRegex, message: "Enter a valid email address!" },
                  ]}
                >
                  <Input size="large" placeholder="example@mail.com" />
                </Form.Item>

                {/* 👇 Restored "City" field below Email and aligned it with Phone */}
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[{ required: true, message: "City is required!" }]}
                    >
                      <Input size="large" placeholder="Enter your city" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        { required: true, message: "Phone number is required!" },
                        { pattern: phoneRegex, message: "Enter a valid 10-digit phone number!" },
                      ]}
                    >
                      <Input size="large" placeholder="9876543210" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Password is required!" },
                    { pattern: passwordRegex, message: "Must be 8-20 chars, 1 uppercase, 1 number, 1 special char" },
                  ]}
                >
                  <Input.Password size="large" placeholder="********" />
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" size="large" className="btn" loading={loading} block>
                    Create Account
                  </Button>
                </Form.Item>

                <Typography.Text className="text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <Button type="link">Sign In</Button>
                  </Link>
                </Typography.Text>
              </Form>
            </div>
          </Col>

          <Col xs={24} md={12} className="image-section">
            <motion.img
              src={registerImage}
              className="auth-image"
              alt="Register"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Col>
        </Row>
      </Card>
    </motion.div>
  );
};

export default Register;
