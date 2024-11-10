import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setISLoggedIn] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        } else {
            setISLoggedIn(true)
        }
    }, [])

    return (
        isLoggedIn &&
        <>
            <NavBar />
            <div className="container p-4 my-4 shadow-sm">
                <div className="card border-success mb-3" style={{ maxWidth: '150rem' }}>
                    <div className="card-header bg-dark text-white h3 text-center border-success">Welcome To Admin Panel</div>
                    <div className="card-body text-success">

                        {/* --------------Cards-------------- */}

                        <div className='container'>

                            <div className="d-flex flex-row flex-wrap justify-content-around">


                                <div className="card text-bg-secondary mb-3 col-lg-3 col-md-6"  >
                                    <div className="card-header h4 text-center">Total Employee</div>
                                    <div className="card-body">
                                        <h1 className="card-title text-center">50</h1>
                                        <p className="card-text text-center">Employees Registered</p>
                                    </div>
                                </div>

                                <div className="card text-bg-secondary mb-3 col-lg-3 col-md-6" >
                                    <div className="card-header h4 text-center">Total Managers</div>
                                    <div className="card-body">
                                        <h1 className="card-title text-center">5</h1>
                                        <p className="card-text text-center">Managers</p>
                                    </div>
                                </div>

                                <div className="card text-bg-secondary mb-3 col-lg-3 col-md-6" style={{ minWidth: '12rem' }} >
                                    <div className="card-header h4 text-center">Total HR</div>
                                    <div className="card-body">
                                        <h1 className="card-title text-center">7</h1>
                                        <p className="card-text text-center">Hr's</p>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* --------------Cards End-------------- */}

                    </div>
                    <div className="text-center card-footer bg-transparent border-success"><Link className=' text-white text-decoration-none btn btn-primary' to={"/employees"}>Employee Management</Link></div>
                </div>
            </div>
        </>
    )
}

export default Home
