import React, { useState } from 'react';
import { Card, Flex, Form, Input, Typography, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImage from '../assets/noExcuseLogo.jpg';
import "../styles/auth.css";


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/users/login", values);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("roles", JSON.stringify(response.data.roles));
            message.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            message.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className='form-container'>
                <Flex gap="large" align='center'>
                    <Flex flex={1}>
                        {/* Ensure image renders properly */}
                        <img src={loginImage} className='auth-image' alt="Login" onError={() => console.error("Error loading login image")} />
                    </Flex>
                    <Flex vertical flex={1}>
                        <Typography.Title level={3} className='title'>Sign In</Typography.Title>
                        <Typography.Text type="secondary" className="slogan">Unlock your world.</Typography.Text>
                        <Form layout="vertical" onFinish={handleLogin} autoComplete='off'>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Invalid Email' }]}>
                                <Input size="large" placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password size="large" placeholder="Enter your password" />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" size="large" className="btn" loading={loading}>Sign In</Button>
                            </Form.Item>
                            <Form.Item>
                                Don't have an account?
                                <Link to="/register"><Button size="large" type="link">Create An Account</Button></Link>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};

export default Login;
