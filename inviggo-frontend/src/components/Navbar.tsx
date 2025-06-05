import { Button, Layout } from "antd"
import { Link } from "react-router-dom";
const { Header } = Layout;

export const Navbar = () => {
  return (
    <Layout>
      <Header className='myHeader'>
      <div className='logo'>
        <Link to="/">
            <img src="src/assets/inviggo_logo.svg"/>
        </Link>
      </div>
      <div style={{alignItems: 'center'}}> 
      <Button ghost type="text" color='default' variant="outlined">Sign up</Button>
      <Link to="/login">
        <Button ghost type="text" color='default' variant="outlined" style={{marginLeft: '15px'}}>Log in</Button>
      </Link>
      </div>
      </Header>
    </Layout>
  )
}
