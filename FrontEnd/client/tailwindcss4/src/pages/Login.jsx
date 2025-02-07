import React from 'react';
import { Card, Flex, Form, Input, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/noExcuseLogo.jpg';

import "../styles/auth.css";

const Login = () => {
    const handleLogin = (values) => {
        console.log(values);
        // After successful signup, redirect to Login page
        window.location.href = "/login";
    };

    return (
        <div className="auth-container">
            <Card className='form-container'>
                <Flex gap="large" align='center'>
                    {/* Image */}
                    <Flex flex={1}>
                        <img src={loginImage} className='auth-image' alt="Login" />
                    </Flex>

                    {/* Form */}
                    <Flex vertical flex={1}>
                        <Typography.Title level={3} strong className='title'>
                            Sign In
                        </Typography.Title>
                        <Typography.Text type="secondary" strong className="slogan">
                            Unlock your world.
                        </Typography.Text>
                        <Form layout="vertical" onFinish={handleLogin} autoComplete='off'>
                            <Form.Item label="Email" name="email" rules={[
                                { required: true, message: 'Please input your Email!' },
                                { type: 'email', message: 'The input is not a valid Email' },
                            ]}>
                                <Input size="large" placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password size="large" placeholder="Enter your password" />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit" size="large" className="btn">
                                    Sign In
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                Don't have an account?
                                <Link to="/register">
                                    <Button size="large" type="link">
                                        Create An Account
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};

export default Login;
