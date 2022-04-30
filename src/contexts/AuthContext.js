import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = async (email, password) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case 'auth/weak-password':
                    throw Error('Weak password');
                case 'auth/email-already-in-use':
                    throw Error('Email already in use');
                default:
            }
        }
    };

    const signin = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    throw Error('Wrong password');
                case 'auth/user-not-found':
                    throw Error('User not found');
                default:
            }
        }
    };

    const logout = () => {
        auth.signOut();
    };

    const resetPassword = async (email) => {
        try {
            await auth.sendPasswordResetEmail(email);
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    throw Error('User not found');
                default:
            }
        }
    };

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);
    };

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        signin,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
