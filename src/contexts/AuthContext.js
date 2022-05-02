import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserDocument, getUserDocument } from '../firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = async (email, password, otherData) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            createUserDocument(auth.currentUser, otherData);
            const userData = await getUserDocument(auth.currentUser.uid);
            setCurrentUser(userData);
        } catch (error) {
            switch (error.code) {
                case 'auth/weak-password':
                    throw Error('Weak password');
                case 'auth/email-already-in-use':
                    throw Error('Email already in use');
                default:
                // throw Error('Weird error');
            }
        }
    };

    const signin = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            const userData = await getUserDocument(auth.currentUser.uid);
            setCurrentUser(userData);
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

    const logout = async () => {
        try {
            auth.signOut();
            setCurrentUser(null);
        } catch (error) {
            console.log(error);
        }
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
        const getUserData = async () => {
            if (auth.currentUser && auth.currentUser.uid) {
                const userData = await getUserDocument(auth.currentUser.uid);
                return userData;
            }
        };

        try {
            setCurrentUser(getUserData());
        } catch (error) {
            console.log('error');
        }
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     const moreUserData = currentUser
    //         ? getUserDocument(currentUser.uid)
    //         : null;

    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             // const moreUserData = getUserDocument(user.uid);
    //             user = { uid: user.uid, ...moreUserData };
    //             console.log('logged in');
    //             console.log(user);
    //             setCurrentUser(user);
    //             // ...
    //         } else {
    //             // User is signed out
    //             // ...
    //             console.log('logged out');
    //             console.log(user);
    //             setCurrentUser(user);
    //         }
    //         setLoading(false);
    //     });

    //     return unsubscribe;
    // }, []);

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
