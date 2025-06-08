import { Button, Card, Form, Input, InputNumber, message, Select, Upload, type UploadFile } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { Category } from "../enums/Category";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../axios/axiosInstance";

const { Option } = Select;

export interface AdFormValues {
  id: string;
  name: string;
  description: string;
  imageUrl: UploadFile[];
  price: number;
  category: string;
  user: string;
  city: string;
}

interface EditAdProps  {
    adData: {
        _id: string;
        imageUrl: string;
        name: string;
        price: number;
        city: string;
        category: Category;
        user: {
            _id: string;
            username: string;
            phone: string;
            registrationDate: Date
        }
    }
};

export const EditAd = () => {
    // ovako pozivas navigate('/editAd', { state: { myProp: 'some value', anotherThing: 123 } })
    const location = useLocation();
    const adData = location.state;
    const [form] = Form.useForm();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const imageUploadValue = [
            {
            uid: '-1',
            name: adData.imageUrl,
            status: 'done',
            url: `http://localhost:3000/images/${adData.imageUrl}`, // prilagodi ako treba
            }
        ];

        form.setFieldsValue({
            name: adData.name,
            description: adData.description,
            price: adData.price,
            category: adData.category,
            city: adData.city,
            imageUrl: imageUploadValue,
        });
        }, [form, location.state]);

        const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    
    const onFinish = async (values: AdFormValues) => {
        const formData = new FormData()
        const file = values.imageUrl?.[0]?.originFileObj;
            
        if(user === null)
        return;
        
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('price', values.price.toString())
        formData.append('city', values.city)
        formData.append('category', values.category)
        formData.append('username', user.username)

        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG files!');
            } 
            formData.append('file', file);
        }

        try {
            const response = await axiosInstance.patch(`/ads/${adData._id}`, formData);
            if(response.status == 204)
            {
                message.success('New ad successfully edited.');
                navigate('/');
            }
            else
            {
                message.error(`Error - Status Code ${response.status}`)
            }
        }catch(error: any){
            message.error(`Error while trying to post new ad. ${error.response.data.message}`);
        }
    };
return (
    <Card title='New Advertisment' style={{width:650, margin: "50px auto"}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item name="name" label="Ad Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Ad Description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="imageUrl" label="Upload" valuePropName="fileList" getValueFromEvent={normFile} >
          <Upload 
            maxCount={1}
            multiple={false}
            listType="picture-card"
            beforeUpload={() => false} 
            >
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select category">
            {Object.values(Category).map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Edit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
