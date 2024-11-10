import React, { useEffect, useState } from 'react'
import EditModal from './modals/EditModal'
import moment from 'moment';

const Table = () => {

    const [employees, setEmployees] = useState([]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);




    // Fetching all employee
    const fetchEmployees = async () => {
        const token = localStorage.getItem('token');

        const url = `${process.env.REACT_APP_API_BASE_URL}/api/employees`;

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();

            if (response.ok) {
                setEmployees(result.data); // Store the employees in the state
                localStorage.setItem('howManyEmployees', result.data.length);
            } else {
                console.error('Error fetching employees:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Delete handling
    const handleDelete = async (id) => {
        var result = window.confirm("Are you sure?");
        if (result) {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            const url = `${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`;  // Employee delete endpoint

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Include JWT token for authentication
                }
            };

            try {
                const response = await fetch(url, requestOptions);
                const result = await response.json();

                if (response.ok) {
                    // On success, remove the employee from the state
                    // setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
                    fetchEmployees();
                } else {
                    console.error('Error deleting employee:', result.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };




    useEffect(() => {
        fetchEmployees(); // Fetch employees when the component mounts
    }, []);



    // modal function
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true)
    };
    const closeModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(false);
    }


    return (
        employees.length > 0 ? (
            <>
                <div className='overflow-scroll'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mob No</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Course</th>
                                <th scope="col">Created</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                employees.map((employee, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td><img width={"45rem"} src={employee.image || "https://cdn-icons-png.flaticon.com/512/21/21104.png"} alt="" /></td>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.number}</td>
                                            <td>{employee.designation}</td>
                                            <td>{employee.gender}</td>
                                            <td className='d-flex'>
                                                {employee.course.map((i, index) => {
                                                    return (
                                                        <p key={index} className='m-1'>{i}</p>
                                                    )
                                                })
                                                }
                                            </td>
                                            <td >{
                                                moment(employee.createdAt).format('D MMM YY')
                                            }</td>
                                            <td className='d-flex'>
                                                <button onClick={() => openModal(employee)} className="btn btn-warning mx-2 fw-bold" type="button">Edit</button>
                                                <button onClick={() => handleDelete(employee._id)} className="btn btn-danger fw-bold" type="submit">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })



                            }

                        </tbody>
                    </table>
                </div>
                {/* Modal */}
                <EditModal isOpen={isModalOpen} onClose={closeModal} employeeData={selectedEmployee} />
            </>) : <div className='text-center'><p className='h2 p-4'>No Employees</p></div>
    )
}

export default Table
