import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Table from '../Components/Table';
import CreateEmpModal from '../Components/modals/CreateEmpModal';
const Employee = () => {
    const [count, setCount] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const navigate = useNavigate()
    const [isLoggedIn, setISLoggedIn] = useState(false)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        } else {
            setISLoggedIn(true)
        }
        setCount(localStorage.getItem('howManyEmployees'))
    }, [])


    return (
        isLoggedIn &&
        <>
            <NavBar />
            <div className='container my-4 shadow-sm' >
                <div className='container shadow-sm'>
                    <div className='column d-flex justify-content-between align-items-center'>
                        <p className='fw-bold'>Total Count : {count}</p>
                        <button type='button' onClick={openModal} className='btn btn-primary my-2 w-full text-center px-4'>Create Employee</button>
                    </div>
                </div>
                <hr />
                <Table />
                {/* Modal */}
                <CreateEmpModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </>
    )
}

export default Employee
