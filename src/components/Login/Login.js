import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Button, Form } from "react-bootstrap"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()

        login(username, password)
    }

    return (
        <div className="pt-3">
            <h1>Login</h1>
            <div className="d-flex justify-content-center align-items-center pt-3">
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formGroupUser">
                        <Form.Control type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="success" size="sm" type="submit">Login</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login