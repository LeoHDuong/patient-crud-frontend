import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '../component/Container';

const EditConfirmation = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { patient } = location.state;

    const handleCancel = () => {
        navigate(`/editpatient/${id}`, { state: { patient } }); // Navigate back to the patient creation form
    };

    const handleSave = async () => {

        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:8080/patients/${id}`, patient, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate('/success-edit'); // Redirect back to the home page after successful update
        } catch (error) {
            console.error('Error updating patient:', error.response.data);
        }
    };

    return (
        <Container>
            <h2>Confirm Patient Adjustment</h2>
            <div>
                <h4>Patient Details</h4>
                <p><strong>First Name:</strong> {patient.firstName}</p>
                <p><strong>Last Name:</strong> {patient.lastName}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
            </div>
            <button className='btn btn-secondary mx-2' onClick={handleCancel}>Cancel</button>
            <button className='btn btn-primary' onClick={handleSave}>Save</button>
        </Container>
    );
};

export default EditConfirmation;
