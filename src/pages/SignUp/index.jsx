import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Input, Row, Col, Button, Alert, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function SignUp() {
    const [form] = Form.useForm();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { signup } = useAuth();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        try {
            setError(null);
            await signup(values.email, values.password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Row justify='center' align='middle' style={{ height: '100vh' }}>
            <Col xs={24} md={12} lg={10} xl={8}>
                <Form
                    className='myForm'
                    labelCol={{ span: 24 }}
                    form={form}
                    name='register'
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Title>Sign Up</Title>
                    {error && <Alert message={error} type='error' />}
                    <Form.Item
                        name='email'
                        label='E-mail'
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='confirm'
                        label='Confirm Password'
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='username'
                        label='Username'
                        tooltip='What do you want others to call you?'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div
                        className='myFooter'
                        style={{ justifyContent: 'center' }}
                    >
                        Have an account?&#160;<Link to='/signin'>Sign In</Link>
                    </div>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
