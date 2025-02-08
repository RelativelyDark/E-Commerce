import React, { useState } from 'react';
import { Card, Form, Input, Typography, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import registerImage from '../assets/noExcuseLogo.jpg';
import "../styles/auth.css";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/users/signup", values);
            message.success("Account created successfully! Please log in.");
            navigate("/login");
        } catch (error) {
            message.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="form-container">
                <div className="register-content">
                    <div className="form-section">
                        <Typography.Title level={3} className="title">Create an Account</Typography.Title>
                        <Typography.Text type="secondary" className="slogan">Join for exclusive access!</Typography.Text>
                        <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                            >
                                <Input size="large" placeholder="Enter your First Name" />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                            >
                                <Input size="large" placeholder="Enter your Last Name" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your Email!' },
                                    { type: 'email', message: 'Invalid Email' },
                                ]}
                            >
                                <Input size="large" placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your City!' }]}
                            >
                                <Input size="large" placeholder="Enter your City" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                            >
                                <Input size="large" placeholder="Enter your Phone Number" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password size="large" placeholder="Enter your password" />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" size="large" className="btn" loading={loading}>
                                    Create Account
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                Already have an account?
                                <Link to="/login">
                                    <Button size="large" type="link">Sign In</Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="image-section">
                        <img src={registerImage} className="auth-image" alt="Register" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Register;
