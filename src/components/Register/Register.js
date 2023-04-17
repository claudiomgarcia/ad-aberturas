import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Button, Form } from "react-bootstrap"

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register } = useAuth()

    const handleSignUp = async (e) => {
        e.preventDefault()
        await register(email, password)
    }

    return (
        <div className="pt-3">
            <h1>Registro</h1>
            <div className="d-flex justify-content-center align-items-center pt-3">
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formGroupUser">
                        <Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="password" placeholder="Contraseña" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div>
                        <Button variant="success" size="sm" type="submit">Registrarse</Button>
                    </div>
                </Form>
            </div >
        </div >
    )
}

export default Register