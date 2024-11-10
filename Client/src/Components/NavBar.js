import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {
    const name = localStorage.getItem('username');

    const navigate = useNavigate()
    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username')
        // Optionally, reset any app state or redirect to the login page
        navigate('/login'); // Redirect to login page (if applicable)
        // Or you can use React Router to programmatically navigate:
        // history.push('/login');
    };



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">Employee Hub</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/employees">Employee List</Link>
                            </li>
                        </ul>
                        <div className=''>
                            <p className="btn btn-outline-dark fw-bold m-2 p-2 text-capitalize" disabled>{name || "User"}</p>
                            <button onClick={handleLogout} className="btn btn-danger py-2 m-2" type="button" >Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
