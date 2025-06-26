import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from 'react-bootstrap';

const Signup = ({ onClose, onSuccess, toggleForm }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');
    //const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const result = await signUp(username, email, password, role);

        if (result.success) {
            //navigate('/'); // Redirect to home page on successful signup
            onSuccess();
            onClose();
        } else {
            setError(result.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="main">
            {/* <h2>Sign Up</h2> */}
            <form onSubmit={handleSubmit} className='signform'>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className='signformInput'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className='signformInput'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className='signformInput'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select className='signformInput' id="role" value={role} onChange={(e) => {const selectedValue = e.target.value;
    setRole(selectedValue); }} required>
                        
                        <option value='admin'>Admin</option>
                        <option value='customer'>Customer</option>
                    </select>

                    {/* <input className='signformInput'
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    /> */}
                </div>
                <button type="submit" className='submit'>Sign Up</button>
            </form>
            {error && <p className='error'>{error}</p>}
            <p className="toggle-form-link" style={{margin:"20px"}}>
                Already have an account? <Button onClick={() => toggleForm('signin')} className='submit'>Sign In</Button>
            </p>
        </div>
    );
};

export default Signup;