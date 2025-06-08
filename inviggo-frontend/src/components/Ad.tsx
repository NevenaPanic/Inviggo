import { DeleteOutlined, EditOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Card, Descriptions, message, Modal, type DescriptionsProps } from 'antd';
import type { Category } from '../enums/Category';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Image } from 'antd';
import axiosInstance from '../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

//slika, ime, cena, grad, kategorije
interface AdProps  {
    adData: {
        _id: string;
        imageUrl: string;
        name: string;
        description: string,
        price: number;
        city: string;
        category: Category;
        user: {
            _id: string;
            username: string;
            phone: string;
            registrationDate: Date
        }
    },
    handleDeleteAd : (_id: string) => void;
};

const Ad = ({adData, handleDeleteAd} : AdProps) => {
  const navigate = useNavigate();
  const { Meta } = Card;
  const user = useAuth();

// modal states
const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);

  const handleEditClick = () => {
    navigate('/editAd', { state: adData });
  };

  const handleDeleteClick = async () => {
    try {
        const response = await axiosInstance.delete(`/ads/${adData._id}`);
        if (response.status == 200) {
            message.success('Ad deleted successfully.');
            handleDeleteAd(adData._id);
        }
      } catch (error) {
        message.error('Error occured while trying to delete ad.');
      }
  };

  const handleOk = () => {
    setViewModalOpen(false);
  };

  const handleCancel = () => {
    setViewModalOpen(false);
  };

  const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Category',
        children: adData.category,
    },
    {
        key: '2',
        label: 'Description',
        children: adData.description,
    },
    {
        key: '3',
        label: 'City',
        children: adData.city,
    },
    {
        key: '4',
        label: 'Price',
        children: `${adData.price} RSD`,
    },
    {
        key: '5',
        label: 'User',
        children: adData.user.username,
    },
    {
        key: '6',
        label: 'Phone Number',
        children: adData.user.phone,
    },
  ];

  return (
    <>
        <Modal
            title={adData.name}
            centered
            open={viewModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Image
                width={200}
                src={`http://localhost:3000/images/${adData.imageUrl}`}
            />
            <Descriptions layout='vertical' title="Ad Info" size='small' items={items} />
        </Modal>
        <Card
            style={{ width: 300 }}
            cover={
            <img
                style={{
                    display: 'block',
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                }}
                alt={adData.imageUrl}
                src={`http://localhost:3000/images/${adData.imageUrl}`}
            />
            }
            actions={[
                <FullscreenOutlined key="more" onClick={() => setViewModalOpen(true)}/>,
                ...(user?.user?.username === adData.user.username ? 
                    [
                        <EditOutlined key="edit" onClick={handleEditClick} />,
                        <DeleteOutlined key="delete" onClick={handleDeleteClick}/>,
                    ] : [])
                ]}
        >
            <Meta
            title={`[${adData.category}] ${adData.name}`}
            description={adData.price + ' RSD - ' + adData.city}
            />
        </Card>
    </>
  )
}

export default Ad