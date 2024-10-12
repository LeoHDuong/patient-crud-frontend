import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../component/Container';
import Alert from '@mui/material/Alert';

function SessionExpired() {

    const navigate = useNavigate();
    localStorage.removeItem('token');

  return (
    <Container>
        <Alert severity="info">
            Sorry, your session has expired. Please log in again!
        </Alert>
        <button
            className='btn btn-primary mt-2'
            onClick={() => { 
                navigate('/login');
            }}
        >
            Login
        </button>
    </Container>
  )
}

export default SessionExpired