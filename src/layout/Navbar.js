import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if the token exists

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">VinBrain</Link>
                    {token && ( // Show logout button only if token exists
                        <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
