import './App.css'
import '@ant-design/v5-patch-for-react-19'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SignUp } from './components/SignUp'
import { NewAd } from './components/NewAd'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<SignUp />}></Route>
          <Route path='/newAd' element={<NewAd />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
