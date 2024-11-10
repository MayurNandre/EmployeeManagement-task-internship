import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    // Check user Loggedin or not
    const [isLoggedIn, setISLoggedIn] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/")
        } else {
            setISLoggedIn(true)
        }
    },[])



    // Login Function
    const Handlelogin = async (username, password) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/api/admin/login`; // Backend URL

        const data = {
            username: username,
            password: password
        };


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();
            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', data.username);
                navigate("/")
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


// On Submit
    const loginHandler = async (e) => {
        e.preventDefault();
        const { username, password } = data;
        await Handlelogin(username, password);
    };


// Hdndle OnChange event
    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    return (
        isLoggedIn &&
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="card-title text-center mb-4">Admin Login</h3>
                <form onSubmit={loginHandler}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            name='username'
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            name='password'
                            onChange={handleOnChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
