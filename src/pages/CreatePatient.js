import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Container from '../component/Container';

function CreatePatient() {
    const navigate = useNavigate();
    const location = useLocation();

    // State for patient data and validation errors
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        email: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        // Check if user is authenticated (i.e., if token exists)
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token doesn't exist
        }
    }, [navigate]);

    useEffect(() => {
        // Check if there's state passed from the confirmation page
        if (location.state && location.state.patient) {
            setPatient(location.state.patient); // Pre-fill the form with patient data
        }
    }, [location.state]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setPatient({ ...patient, [name]: value });
        
        // Clear the error for this field when the user starts typing
        setErrors({ ...errors, [name]: '' });
    }

    function validateForm() {
        let valid = true;
        const newErrors = {};

        // Validate required fields
        Object.keys(patient).forEach((key) => {
            if (!patient[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
                valid = false;
            }
        });

        // Validate age range
        const age = parseInt(patient.age, 10);
        if (age <= 0 || age >= 120) {
            newErrors.age = 'Age must be between 1 and 119.';
            valid = false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(patient.email)) {
            newErrors.email = 'Email is not valid.';
            valid = false;
        }

        // Validate phone number pattern
        const phoneRegex = /^\+?[0-9. ()-]{7,}$/;
        if (!phoneRegex.test(patient.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    function handleSubmit() {
        if (validateForm()) {
            // Navigate to confirmation page with patient data
            navigate('/confirm-create', { state: { patient } });
        }
    }

    const handleCancel = () => {
        navigate('/'); // Redirect back to home page
    };

    return (
        <Container>
            <h2 className='text-center m-4'>Register Patient</h2>
            {Object.values(errors).some(error => error) && (
                <Alert severity="error">
                    {Object.values(errors).filter(error => error).map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </Alert>
            )}
            <div className='mb-3'>
                <label htmlFor='firstName' className='form-label'>First Name</label>
                <input type="text" className='form-control' placeholder='Enter your first name' name="firstName" value={patient.firstName} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor='lastName' className='form-label'>Last Name</label>
                <input type="text" className='form-control' placeholder='Enter your last name' name="lastName" value={patient.lastName} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor='gender' className='form-label'>Gender</label>
                <input type="text" className='form-control' placeholder='Enter your gender' name="gender" value={patient.gender} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor='age' className='form-label'>Age</label>
                <input type="text" className='form-control' placeholder='Enter your age' name="age" value={patient.age} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input type="text" className='form-control' placeholder='Enter your email' name="email" value={patient.email} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor='phoneNumber' className='form-label'>Phone Number</label>
                <input type="text" className='form-control' placeholder='Enter your phone number' name="phoneNumber" value={patient.phoneNumber} onChange={handleInputChange} />
            </div>
            <button type="button" className='btn btn-outline-secondary mx-2' onClick={handleCancel}>Cancel</button>
            <button type="button" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
        </Container>
    );
}

export default CreatePatient;
