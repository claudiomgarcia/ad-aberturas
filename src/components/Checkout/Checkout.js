import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { Form, Button, Spinner } from "react-bootstrap"
import { useNotification } from "../../notification/NotificationService"
import { useNavigate, Link } from 'react-router-dom'
import { useOrders } from "../../services/firebase/firestore/orders"
import { useAuth } from "../../context/AuthContext"

const Checkout = () => {
    const { user } = useAuth()
    const [orderId, setOrderId] = useState('')
    const [buyerData, setBuyerData] = useState({});
    const [loading, setLoading] = useState(false)
    const { cart, clearCart, total } = useContext(CartContext)
    const { setNotification } = useNotification()
    const { createOrder } = useOrders()
    const navigate = useNavigate()

    const handleConfirm = async (e) => {
        e.preventDefault()
        setLoading(true)

        const objOrder = {
            buyer: {
                name: buyerData.name,
                phone: buyerData.phone,
                email: buyerData.email,
                address: buyerData.address
            },
            items: cart,
            total: total

        }

        createOrder(objOrder, cart).then(response => {
            console.log(response)
            if (response.result === 'orderCreated') {
                clearCart()
                setOrderId(response.id)
            }
            if (response.result === 'outOfStockError') {
                navigate('/cart')
                setNotification('error', 'Hay articulos sin stock disponible', 5)
            }
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (loading) {
        return (
            <div className='pt-5 text-center'>
                <div>Generando orden...</div>
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    if (user) {
        return (
            <div className="pt-3">
                <h1>Checkout</h1>
                <div className="text-center pt-5">
                    {orderId ? <h4>El id de su orden es: <b>{orderId}</b></h4> :
                        <div className="d-flex justify-content-center align-items-center pt-3">
                            <Form onSubmit={handleConfirm}>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Control type="text" name="name" required placeholder="Nombre y Apellido" value={buyerData.name} onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPhone">
                                    <Form.Control type="text" name="phone" required placeholder="Telefono" value={buyerData.phone} onChange={(e) => setBuyerData({ ...buyerData, phone: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Control type="email" name="email" required placeholder="Email" value={buyerData.email} onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupAddress">
                                    <Form.Control type="text" name="address" required placeholder="Direccion" value={buyerData.address} onChange={(e) => setBuyerData({ ...buyerData, address: e.target.value })} />
                                </Form.Group>
                                <Button variant="success" size="sm" type="submit">Generar Orden</Button>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='pt-5 text-center'>
                <div className="pb-3">Debes loguearte para ver ésta sección</div>
                <Link to='/login'><Button variant='success' className="mb-1">Login</Button></Link>
            </div>
        )
    }

}

export default Checkout