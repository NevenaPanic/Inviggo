import { Layout, Space } from "antd"
import Ad from "./Ad"
import { Category } from "../enums/Category"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import axiosInstance from "../axios/axiosInstance"

export const Home = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      try {
        const response = await axiosInstance.get('/ads');
        if (response.data) {
          setAds(response.data);
        }
      } catch (error) {
        console.error('Greška pri dohvatanju oglasa:', error);
      }
    };

    getAds();
  }, []);

  return (
    
    <>
      <Layout style={{ margin:"20px", backgroundColor: "transparent" }}>
        <h1>Available Ads</h1>
        <Content>
          <Space size={16} wrap>
          {ads.map((ad, index) => (
            <Ad 
              adData={ad}
              key={index}
            />
          ))}
          </Space>
        </Content>
      </Layout>
      
    </>
  )
}
