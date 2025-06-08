import { Button, Checkbox, Col, Input, InputNumber, Layout, Pagination, Row, Select, } from "antd"
import Ad from "./Ad"
import { useEffect, useState } from "react"
import axiosInstance from "../axios/axiosInstance"
import { Category } from "../enums/Category";
import { useAuth } from "../contexts/AuthContext";

const { Footer, Sider, Content} = Layout;
const { Option } = Select;

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '60px',
  color: '#fff',
  backgroundColor: '#f2f2f2'
};

interface AdData  {
    _id: string;
    imageUrl: string;
    name: string;
    description: string;
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

export const Home = () => {
  const [ads, setAds] = useState<AdData[]>([]);
  const { user } = useAuth();
  // need to make function here to handle delete logic for individual ad, trigger rerender home

  // pagination
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);

  // fillter
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState<number | null>();
  const [maxPrice, setMaxPrice] = useState<number | null>();
  const [showMine, setShowMine] = useState(false);

  const getAds = async (
    overridePage = page,
    useFilters = true
  ) => {
    try {
      const params: any = {
        page: overridePage,
        limit
      };

      if (useFilters) {
        if (name) 
          params.name = name;
        if (category) 
          params.category = category;
        if (minPrice !== null) 
          params.minPrice = minPrice;
        if (maxPrice !== null) 
          params.maxPrice = maxPrice;
        if (showMine)
          params.username = user?.username;

      }

      const response = await axiosInstance.get("/ads", { params });

      if (response.data.ads) {
        setAds(response.data.ads);
        setTotal(response.data.total);
        setLimit(response.data.limit);
      }
    } catch (error) {
      console.error("Error while trying to get ads", error);
    }
  };

  useEffect(() => {
    getAds(page, false);
  }, []);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    getAds(newPage);
  };

  const handleSearch = () => {
    setPage(1);
    getAds(1);
  };

  const handleDeleteAd = (_id : string) : void => {
    setAds(prevAds => prevAds.filter(ad => ad._id !== _id));
  }
  
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#1D1D1D',
    backgroundColor: 'transparent',
  };
  
  return (
    
    <>
      <Layout style={{ margin:"20px", backgroundColor: "transparent" }}>
        <h1>Available Ads</h1>
        <Layout>
          <Content style={{ padding: '20px' }}>
            <Row gutter={[16, 16]} justify="center">
              {ads.map((ad, index) => (
                <Col
                  key={index}
                  xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}
                >
                  <Ad adData={ad} handleDeleteAd={handleDeleteAd}/>
                </Col>
              ))}
            </Row>
          </Content>
          <Sider width="15%" style={siderStyle}>
            <div style={{padding: '10px'}}>
              <Input
                placeholder="Search by name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                placeholder="Select category"
                value={category}
                onChange={(value) => setCategory(value)}
                style={{ width: '100%' }}
              >
                <Option value="">All</Option>
                {Object.values(Category).map((cat) => (
                  <Option value={cat}>{cat}</Option>
                ))}
              </Select>
              <InputNumber
                placeholder="Min price"
                value={minPrice}
                onChange={setMinPrice}
                style={{ width: '100%' }}
              />
              <InputNumber
                placeholder="Max price"
                value={maxPrice}
                onChange={setMaxPrice}
                style={{ width: '100%' }}
              />
              {user && (
                <Checkbox checked={showMine} onChange={(e) => setShowMine(e.target.checked)}>
                  Show mine only
                </Checkbox>
              )}
              <Button type="primary" onClick={handleSearch} block>
                Search
              </Button>
            </div>
          </Sider>
        </Layout>
        <Footer style={footerStyle}>
          <Pagination 
            align="center"
            current={page}
            total={total}
            defaultPageSize={limit}
            onChange={onPageChange}
          />
        </Footer>
      </Layout>
      
    </>
  )
}
