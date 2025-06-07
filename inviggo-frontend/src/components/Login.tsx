import type { FormProps } from 'antd';
import { Button, Form, Input, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
//import { useState } from 'react';

type FieldType = {
  username?: string;
  password?: string;
};

// ant designs onSubmit() method
export const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  };

  try {
    const response = await fetch('http://localhost:3000/users/login', requestOptions);

    if(response.ok){  
      // here I'll store token
      const data = await response.json();
      const token = data.jwtToken;
      localStorage.setItem('jwtToken', token);
      login({ username: data.username });

      // redirect to home page
      navigate('/');
    } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Login failed');
    }
  } catch (error) {
      message.error('Something went wrong... :(');
  }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


  return (
    <>
        <Card title="Log In" style={{width:350, margin: "50px auto"}}>
            <Form
                name="loginForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button ghost type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </>
  )
}
