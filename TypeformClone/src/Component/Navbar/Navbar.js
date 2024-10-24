import React from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.svg'

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="navbar logo" className="navbar-logo" />
        </div>
    )
}

export default Navbar