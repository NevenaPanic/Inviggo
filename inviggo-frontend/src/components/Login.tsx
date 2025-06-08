import type { FormProps } from 'antd';
import { Button, Form, Input, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../axios/axiosInstance';
import type { AxiosResponse } from 'axios';

type FieldType = {
  username?: string;
  password?: string;
};

// ant designs onSubmit() method
export const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await axiosInstance.post('/users/login', values);
      if(response.data.jwtToken !== null)
      {
        localStorage.setItem('jwtToken', response.data.jwtToken);
        login({ username: response.data.username });
        message.success(`Welcome ${response.data.username}!`);
        // redirect to home page
        navigate('/');
      }
    } catch (error: any) {
        if(error.response)
        {
          message.error(error.response.data.message);
        }
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
