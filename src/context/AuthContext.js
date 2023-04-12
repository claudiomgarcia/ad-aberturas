import { useState, createContext, useContext } from "react";
import { useNotification } from "../notification/NotificationService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log(user)

    const navigate = useNavigate()
    const { setNotification } = useNotification()

    const login = (username, password) => {
        //logica de login, request a una api
        //guardar los datos del usuario en una coleccion, para despues poder utilizar el uuid y agregarlo a la orden de compras.
        setUser({ username })
        navigate('/')
        setNotification('success', `Bienvenido ${username}`, 3)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}