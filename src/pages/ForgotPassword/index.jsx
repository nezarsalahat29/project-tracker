import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Input, Row, Col, Button, Alert, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const { resetPassword } = useAuth();

  const onFinish = async (values) => {
    try {
      setError(null);
      await resetPassword(values.email);
      setMessage('Check your email for further instructions');
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
          <Title>Password Reset</Title>
          {error && <Alert message={error} type='error' />}
          {message && <Alert message={message} type='info' />}
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

          <div className='myFooter'>
            <Link to='/signin'>Sign In</Link>
            <div>
              Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
