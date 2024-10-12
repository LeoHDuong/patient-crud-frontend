import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../component/Container';
import Alert from '@mui/material/Alert';

function Unauthorized() {

    const navigate = useNavigate();

  return (
    <Container>
        <Alert severity="error">
            You are unauthorized to access this page!
        </Alert>
        <button
            className='btn btn-primary mt-2'
            onClick={() => { 
                navigate('/');
            }}
        >
            Go back to Home page
        </button>
    </Container>
  )
}

export default Unauthorized;