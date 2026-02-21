import './App.css'
import { Route, Routes } from 'react-router'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Shows from './pages/Shows'
import ShowDetails from './components/ShowDetails'
import Admin from './pages/admin/Admin'
import Footer from './components/Footer'

import RequireAuth from './auth/RequireAuth'
import ManageShows from './pages/admin/ManageShows'
import ManageMerch from './pages/admin/ManageMerch'

function App() {

  return (
    <>
    <Navbar/>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="shows" element={<Shows/>}/>
        <Route path="shows/:id" element={<ShowDetails/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="admin" element={<Admin/>}/>
        <Route path="admin/add-show" element={
        <RequireAuth>
          <ManageShows />
        </RequireAuth>
        }/>
        <Route path="admin/add-merch" element={
          <RequireAuth>
            <ManageMerch />
          </RequireAuth>
        }/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
