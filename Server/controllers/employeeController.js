const Employee = require('../models/employee');

// Add a new employee
const addEmployee = async (req, res) => {
    try {
        const { name, email, number, designation, gender, course, image } = req.body;

        const newEmployee = new Employee({
            name,
            email,
            number,
            designation,
            gender,
            course,
            image
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            message:"Employee fetched",
            data:employees
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an employee
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, number, designation, gender, course, image } = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, number, designation, gender, course, image },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
};
