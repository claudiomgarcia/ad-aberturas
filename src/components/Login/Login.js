import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Button, Form } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const { login, loginWithGoogle } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(user, password)
    }

    const handleGoogle = async (e) => {
        await loginWithGoogle()
    }

    return (
        <div className="pt-3">
            <h1>Login</h1>
            <div className="d-flex justify-content-center align-items-center pt-3">
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formGroupUser">
                        <Form.Control type="email" placeholder="Email" value={user} required onChange={(e) => setUser(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Contraseña" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div>
                        <Button variant="success" size="sm" type="submit">Login</Button>
                        <Link to='/register'><Button variant="primary" size="sm" className="m-1">Registrarse</Button></Link>
                    </div>
                    <div className="d-grid">
                        <Button variant="success" size="sm" onClick={(e) => handleGoogle(e)}>Login with Google</Button>
                    </div>
                </Form>
            </div >
        </div >
    )
}

export default Login