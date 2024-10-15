import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Container from '../component/Container';

function EditPatient() {
    const { id } = useParams(); // Get the patient ID from the URL
    const navigate = useNavigate();
    const location = useLocation();
    
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

    // Fetch patient data by ID when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token doesn't exist
        } else {
            const fetchPatientData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/patients/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPatient(response.data); // Pre-fill the form with fetched patient data
                } catch (error) {
                    console.error('Error fetching patient data:', error.response.data);
                }
            };

            // Check if patient data is passed through state
            if (location.state && location.state.patient) {
                setPatient(location.state.patient); // Use the patient from state
            } else {
                fetchPatientData(); // Fetch data from the server if not available in state
            }
        }
    }, [id, navigate, location.state]);

    // Handle input change
    function handleInputChange(event) {
        const { name, value } = event.target;
        setPatient({ ...patient, [name]: value });
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
            newErrors.phoneNumber = 'Phone number must be at least 7 characters long.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    // Handle form submission to update patient
    function handleSubmit() {
        if(validateForm()) {
        navigate(`/confirm-edit/${id}`, {state: {patient}})
        }
    }

    function handleCancel() {
        navigate("/");
    }

    return (
        <Container>
            <h2 className='text-center m-4'>Edit Patient</h2>
            {Object.values(errors).some(error => error) && (
                <Alert severity="error">
                    {Object.values(errors).filter(error => error).map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </Alert>
            )}
            <div className='mb-3'>
                <label htmlFor='FirstName' className='form-label'>First Name</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter first name'
                    name="firstName"
                    value={patient.firstName}
                    onChange={handleInputChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='LastName' className='form-label'>Last Name</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter last name'
                    name="lastName"
                    value={patient.lastName}
                    onChange={handleInputChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Gender' className='form-label'>Gender</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter gender'
                    name="gender"
                    value={patient.gender}
                    onChange={handleInputChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Age' className='form-label'>Age</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter age'
                    name="age"
                    value={patient.age}
                    onChange={handleInputChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='Email' className='form-label'>Email</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter email'
                    name="email"
                    value={patient.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='PhoneNumber' className='form-label'>Phone Number</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter phone number'
                    name="phoneNumber"
                    value={patient.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>
            <button type="button" className='btn btn-outline-secondary mx-2' onClick={handleCancel}>Cancel</button>
            <button type="button" className='btn btn-primary' onClick={handleSubmit}>Update</button>
        </Container>
    );
}

export default EditPatient;
