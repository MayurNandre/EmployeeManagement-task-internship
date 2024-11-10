// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Employee from './pages/Employee';

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/employees" element={<Employee />} />
                    {/* Add other routes here */}
                </Routes>
            </Router>
    );
}

export default App;
