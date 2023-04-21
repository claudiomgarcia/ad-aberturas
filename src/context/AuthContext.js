import { useState, createContext, useContext, useEffect } from "react";
import { useNotification } from "../notification/NotificationService";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const { setNotification } = useNotification()
    
    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/')
                setNotification('success', `Usuario creado, bienvenido`, 3)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                setNotification('error', errorMessage, 5)
            })
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                navigate('/')
                setNotification('success', `Bienvenido ${user.displayName || user.email}`, 3)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                setNotification('error', errorMessage, 5)
            });
    }

    const loginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithPopup(auth, googleProvider)
        navigate('/')

    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null)
            navigate('/')
            setNotification('success', 'Sesión cerrada', 3)
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log({ currentUser });
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, register, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}