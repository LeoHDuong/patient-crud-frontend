import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">VinBrain</Link>
                    {token && (
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
