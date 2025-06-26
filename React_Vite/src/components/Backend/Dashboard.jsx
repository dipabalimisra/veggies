import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/'); // Redirect to home or signin page after sign out
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <>
                    <p>Welcome, {user.username}!</p>
                    <p>Your email: {user.email}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <p>You need to be logged in to view this page.</p>
            )}
        </div>
    );
};

export default Dashboard;