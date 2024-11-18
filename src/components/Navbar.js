import React from 'react';
import { Link } from 'react-router-dom';  
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* wrap the logo with a Link to make it clickable */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="logo-learn">Learn</span>
                    <span className="logo-vault">Vault</span>
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>  {/* Changed to Link */}
                <Link to="/categories">Categories</Link>  {/* Changed to Link */}
            </div>
        </nav>
    );
}

export default Navbar;
