import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // To check initial auth state

    useEffect(() => {
        // Check localStorage for token on initial load
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Optionally, fetch user details using the token
            axios.get('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch user profile:", err);
                localStorage.removeItem('token'); // Clear invalid token
                setToken(null);
            });
        }
        setLoading(false);
    }, []);

    const signIn = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
            const { token, ...userData } = res.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Sign in error:', error.response ? error.response.data.message : error.message);
            return { success: false, message: error.response ? error.response.data.message : 'Sign in failed' };
        }
    };

    const signUp = async (username, email, password, role) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password, role });
            const { token, ...userData } = res.data;
            localStorage.setItem('token', token);
            setToken(token);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Sign up error:', error.response ? error.response.data.message : error.message);
            return { success: false, message: error.response ? error.response.data.message : 'Sign up failed' };
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};