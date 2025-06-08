import { DeleteOutlined, EditOutlined, EllipsisOutlined, FullscreenOutlined, FundViewOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, message } from 'antd';
import type { Category } from '../enums/Category';

//slika, ime, cena, grad, kategorije
interface AdProps  {
    adData: {
        url: string;
        name: string;
        price: number;
        city: string;
        category: Category;
    }
}

const Ad = ({adData} : AdProps) => {
  const { Meta } = Card;

  const handleEditClick = () => {
    message.info('Kliknuto: Izmeni');
  };

  return (
    <>
        <Card
            style={{ width: 300 }}
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
                <FullscreenOutlined key="more"/>,
                <EditOutlined key="edit" onClick={handleEditClick}/>,
                <DeleteOutlined key="delete"/>,
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