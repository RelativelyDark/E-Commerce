import React from 'react';
import { Card, Flex, Form, Input, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import registerImage from '../assets/noExcuseLogo.jpg';

import "../styles/auth.css";

const Register = () => {
    const handleRegister = (values) => {
        console.log(values);
        // After successful signup, redirect to Login page
        window.location.href = "/login";
    };

    return (
        <div className="auth-container">
            <Card className='form-container'>
                <Flex gap="large" align='center'>
                    {/* Form */}
                    <Flex vertical flex={1}>
                        <Typography.Title level={3} strong className='title'>
                            Create an Account
                        </Typography.Title>
                        <Typography.Text type="secondary" strong className="slogan">
                            Join for exclusive access!
                        </Typography.Text>
                        <Form layout="vertical" onFinish={handleRegister} autoComplete='off'>
                            <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                                <Input size="large" placeholder="Enter your Full Name" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[
                                { required: true, message: 'Please input your Email!' },
                                { type: 'email', message: 'The input is not a valid Email' },
                            ]}>
                                <Input size="large" placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password size="large" placeholder="Enter your password" />
                            </Form.Item>
                            <Form.Item label="Confirm Password" name="passwordConfirm" rules={[{ required: true, message: 'Please confirm your Password!' }]}>
                                <Input.Password size="large" placeholder="Re-enter your password" />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType="submit" size="large" className="btn">
                                    Create Account
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                Already have an account?
                                <Link to="/login">
                                    <Button size="large" type="link">
                                        Sign In
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Flex>

                    {/* Image */}
                    <Flex flex={1}>
                        <img src={registerImage} className='auth-image' alt="Register" />
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};

export default Register;
