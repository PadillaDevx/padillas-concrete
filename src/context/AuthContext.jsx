// =============================================================================
// Auth Context - Admin Authentication State Management
// =============================================================================

import { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken, logout as apiLogout } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const isValid = await verifyToken();
            if (isValid) {
                // Decode token to get user info (simple base64 decode)
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    }

    function login(userData, token) {
        localStorage.setItem('adminToken', token);
        setUser(userData);
    }

    function logout() {
        apiLogout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
