import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/home'
import Contact from './pages/Contact'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="contact" element={<Contact/>}/>
      </Routes>
    </>
  )
}

export default App
