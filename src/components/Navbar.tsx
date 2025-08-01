import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router'
import { DynamicLogo } from './theme/DynamicLogo'

const Navbar = () => {
  return (
    <div>
        <div className="navbar-container">
            <div className="logo-container">
                {/* <img src="/text-logo-dark.svg" alt="icon" style={{height: "100%", width: "100%"}}/> */}
                <DynamicLogo />
            </div>

            <div className="nav-menu-container">
                <NavLink className="nav-link" to="/">HOME</NavLink>
                <NavLink className="nav-link" to="/shows">SHOWS</NavLink>
                <NavLink className="nav-link" to="/shop">SHOP</NavLink>
                <NavLink className="nav-link" to="/contact">CONTACT</NavLink>
                <NavLink className="nav-link" to="/admin">ADMIN</NavLink>
            </div>


            <div className="mobile-nav-container">
                <NavLink className="nav-link" to="/">HOME</NavLink>
                <NavLink className="nav-link" to="/shows">SHOWS</NavLink>
                <NavLink className="nav-link" to="/shop">SHOP</NavLink>
                <NavLink className="nav-link" to="/contact">CONTACT</NavLink>
                <NavLink className="nav-link" to="/admin">ADMIN</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar