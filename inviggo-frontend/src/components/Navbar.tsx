import { Button, Layout } from "antd"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const { Header } = Layout;

export const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem('jwtToken');
  };

  return (
    <Layout>
      <Header className='myHeader'>
      <div className='logo'>
        <Link to='/'>
            <img src="src/assets/inviggo_logo.svg"/>
        </Link>
      </div>
      <div style={{alignItems: 'center'}}> 
      {
        user ? (
          <>
            <Button ghost type="text" color='default' variant="outlined">{user.username}</Button>
            <Button onClick={handleLogOut} ghost type="text" color='default' variant="outlined" style={{marginLeft: '15px'}}>Logout</Button>
          </>
        ) : (
          <>
            <Link to='/register'>
              <Button ghost type="text" color='default' variant="outlined">Sign up</Button>
            </Link>
            <Link to='/login'>
              <Button ghost type="text" color='default' variant="outlined" style={{marginLeft: '15px'}}>Log in</Button>
            </Link>
          </>
        )
      }
      </div>
      </Header>
    </Layout>
  )
}
