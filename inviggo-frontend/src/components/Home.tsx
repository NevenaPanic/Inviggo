import { Layout, Space } from "antd"
import Ad from "./Ad"
import { Category } from "../enums/Category"
import { Content } from "antd/es/layout/layout"

export const Home = () => {
  const ads = [
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""},
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""},
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""},
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""},
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""},
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""},
    {name: "Auto", price: 5000, city: "Novi Sad", category: Category.Games, url: ""}
  ]
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
