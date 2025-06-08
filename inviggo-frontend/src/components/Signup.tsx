import type { FormProps } from 'antd';
import { Form, Input, Button, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../axios/axiosInstance';

type FieldType = {
  username: string;
  password: string;
  phone: string;
};

export const SignUp = () => {
  const navigate = useNavigate();
   const { login } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try{
      const response = await axiosInstance.post('/users/register', values);
      if(response.data.jwtToken !== null)
      {
        localStorage.setItem('jwtToken', response.data.jwtToken);
        login({ username: response.data.username });

        message.success('Registration successful!');
        navigate('/'); // redirect to home
      }
    } catch (error: any) {
        if(error.response)
        {
          message.error(error.response.data.message);
        }
    }
  };

  return (
    <Card title='Register Form' style={{width:550, margin: "50px auto"}}>
        <Form name="signup" layout="vertical" onFinish={onFinish}>
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^\d+$/, message: 'Phone number must be numeric' },
            ]}
            >
            <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" block>
            Register
            </Button>
        </Form.Item>
        </Form>
    </Card>
  );
}
