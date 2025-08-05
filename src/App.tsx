import './App.css'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Shows from './pages/Shows'
import Admin from './pages/admin/Admin'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="shows" element={<Shows/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="admin" element={<Admin/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
