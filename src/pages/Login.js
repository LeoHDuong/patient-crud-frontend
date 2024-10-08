import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            setError('Login failed. Please check your username and password.');
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h2>Login</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label>Username</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <input 
                        type='password' 
                        className='form-control' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type='submit' className='btn btn-primary'>{isLoading ? "Logging in..." : "Login"}</button>
            </form>
        </div>
    );
}

export default Login;
