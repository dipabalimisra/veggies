import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './SignForm.css';
import { Button } from 'react-bootstrap';

const Signin = ({ onClose, onSuccess, toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await signIn(email, password);

        if (result.success) {
            //navigate('/'); // Redirect to dashboard on successful signin
            onSuccess();
            onClose();
        } else {
            setError(result.message || 'Sign in failed. Please check your credentials.');
        }
    };

    return (
        <div className="main">
            {/* <h2>Sign In</h2> */}
            <form onSubmit={handleSubmit} className="signform">
                <div>
                    <label htmlFor="email" >Email:</label>
                    <input className='signformInput'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div >
                    <label htmlFor="password">Password:</label>
                    <input className='signformInput'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" class="submit">Sign In</button>
            </form>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            {error && <p className="error">{error}</p>}
            <p className="toggle-form-link" style={{margin:"20px"}}>
                Don't have an account? <Button onClick={() => toggleForm('signup')} className='submit'>Sign Up</Button>
            </p>
        </div>
    );
};

export default Signin;