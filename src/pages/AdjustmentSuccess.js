import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../component/Container';
import Alert from '@mui/material/Alert'; // Corrected the import

function AdjustmentSuccess() {
    const navigate = useNavigate();

    return (
        <Container>
            <Alert severity="success">
                Congrats! Patient adjusted successfully.
            </Alert>
            <button className='btn btn-primary mt-2' onClick={() => {navigate("/")}}>Go home</button>
        </Container>        

    );
}

export default AdjustmentSuccess;
