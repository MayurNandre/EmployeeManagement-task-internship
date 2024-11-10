import React, { useEffect, useState } from 'react';

const EditModal = ({ isOpen, onClose, employeeData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        designation: "",
        gender: "",
        course: [],
        image: null,
    });


    useEffect(() => {
        if (employeeData) {
            // console.log(employeeData._id)
            setFormData({
                name: employeeData.name || "",
                email: employeeData.email || "",
                number: employeeData.number || "",
                designation: employeeData.designation || "",
                gender: employeeData.gender || "",
                course: employeeData.course || [],
                image: null, // Assuming image is not directly pre-loaded; you can handle it separately if needed
            });
        }
    }, [employeeData]);


    const editEmployeeHandler = async (e) => {
        e.preventDefault();
    
        const url = `${process.env.REACT_APP_API_BASE_URL}/api/employees/${employeeData._id}`;
        const token = localStorage.getItem('token');
    
        // Prepare data to send (exclude image)
        const data = {
            name: formData.name,
            email: formData.email,
            number: formData.number,
            designation: formData.designation,
            gender: formData.gender,
            course: formData.course, // You can send the array directly
        };
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Ensure content type is JSON
                },
                body: JSON.stringify(data), // Send the data as a JSON string
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log("Employee updated successfully:", responseData);
                onClose();  // Close the modal
            } else {
                console.error("Error updating employee:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };
    


    // handle On change
    const handleOnChange = (e) => {
        const { name, value, type, checked, files } = e.target

        setFormData((preve) => {

            if (type === 'checkbox') {
                // For checkboxes, update the array by adding or removing the value
                const updatedArray = checked
                    ? [...preve[name], value]  // Add the value if checked
                    : preve[name].filter((item) => item !== value);  // Remove if unchecked
                return {
                    ...preve,
                    [name]: updatedArray,
                };
            }
            if (type === 'file') {
                // For file (image) input, store the file object in state
                return {
                    ...preve,
                    [name]: files[0], // Store the first file
                };
            }
            return {
                ...preve,
                [name]: value
            }
        })
    }
    // console.log(formData)

    if (!isOpen) return null; // Don't render if modal isn't open
    return (
        <div
            className="modal fade show"
            style={{ display: 'block' }} // Ensures modal is visible
            id="editModal"
            tabIndex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">
                            Edit Employee Details
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Update Form */}
                        <form onSubmit={editEmployeeHandler}>
                            <div className="mb-2">
                                <label htmlFor="name" className="form-label fw-bold">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="email" className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="number" className="form-label fw-bold">Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="number"
                                    name='number'
                                    value={formData.number}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="designation" className='fw-bold'>Designation</label>
                                <select className="form-control" id="designation" name='designation' value={formData.designation} onChange={handleOnChange}>
                                    <option value="" disabled selected>Select an Designation</option>
                                    <option value="HR">HR</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>

                            <div className="form-group mb-2">
                                <label className='fw-bold'>Gender</label><br />
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="Male" checked={formData.gender === 'Male'} onChange={handleOnChange} />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="Female" checked={formData.gender === 'Female'} onChange={handleOnChange} />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>


                            <div className="form-group mb-2">
                                <label className='fw-bold'>Course</label><br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="bca" name="course" value="BCA" checked={formData.course.includes('BCA')} onChange={handleOnChange} />
                                    <label className="form-check-label" htmlFor="bca">BCA</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="mca" name="course" value="MCA" checked={formData.course.includes('MCA')} onChange={handleOnChange} />
                                    <label className="form-check-label" htmlFor="mca">MCA</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="bsc" name="course" value="BSC" checked={formData.course.includes('BSC')} onChange={handleOnChange} />
                                    <label className="form-check-label" htmlFor="bsc">BSC</label>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="imageUpload" className='fw-bold'>Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="imageUpload"
                                    accept="image/*"
                                    name='image'
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-warning">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
