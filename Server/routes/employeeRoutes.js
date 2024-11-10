const express = require('express');
const router = express.Router();
const {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');


// Route to get all employees
router.get('/employees', protect, getEmployees);

// Route to add a new employee
router.post('/employees/add', protect, addEmployee);

// Route to update an employee
router.put('/employees/:id', protect, updateEmployee);

// Route to delete an employee
router.delete('/employees/:id', protect, deleteEmployee);

module.exports = router;
