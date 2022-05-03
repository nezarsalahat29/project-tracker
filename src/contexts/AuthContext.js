import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react';
import { auth } from '../firebase';
import { createUserDocument, getUserDocument } from '../firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const setCurrentUserInStateAndLocalStorage = (fullUserData) => {
        setCurrentUser(fullUserData);
        localStorage.setItem('currentUser', JSON.stringify(fullUserData));
    };

    const signup = async (email, password, otherData) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            const user = auth.currentUser;
            createUserDocument(user, otherData);
            const userData = await getUserDocument(user.uid);

            setCurrentUserInStateAndLocalStorage({
                uid: user.uid,
                ...userData,
            });
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
            const { uid } = auth.currentUser;
            const userData = await getUserDocument(uid);

            setCurrentUserInStateAndLocalStorage({ uid, ...userData });
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
        try {
            auth.signOut();
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
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
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            console.log('signed in');
            setCurrentUser(user);
        } else {
            console.log('signed out');
            setCurrentUser(null);
        }
        setLoading(false);
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
