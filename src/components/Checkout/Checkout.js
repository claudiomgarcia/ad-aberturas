import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from '../../services/firebase/firebaseConfig'
import { documentId, getDocs, query, collection, where, writeBatch, addDoc } from "firebase/firestore"
import Button from "react-bootstrap/esm/Button"
import Spinner from "react-bootstrap/esm/Spinner"
import { Form } from "react-bootstrap"
import { useNotification } from "../../notification/NotificationService"
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const [orderId, setOrderId] = useState('')
    const [buyerData, setBuyerData] = useState({ name: '', phone: '', address: '' });
    const [loading, setLoading] = useState(false)
    const { cart, total, clearCart } = useContext(CartContext)
    const { setNotification } = useNotification()
    const navigate = useNavigate()

    const handleConfirm = async (userData) => {
        try {
            setLoading(true)

            const objOrder = {
                buyer: {
                    name: buyerData.name,
                    phone: buyerData.phone,
                    address: buyerData.address
                },
                items: cart,
                total: total

            }

            const ids = cart.map(prod => prod.id)
            const productRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const productsAddedFromFirestore = await getDocs(productRef)
            const { docs } = productsAddedFromFirestore

            const batch = writeBatch(db)
            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc, ...dataDoc })
                }
            })

            if (outOfStock.length === 0) {
                batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)
                clearCart()
                setOrderId(orderAdded.id)

                setTimeout(() => {
                    navigate('/')
                }, 10000)

            } else {
                setNotification('error', 'Hay productos que no tienen stock disponible')
            }
        } catch (error) {
            setNotification('error', 'Hubo un error generando la orden')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className='pt-5 text-center'>
                <div>Generando orden...</div>
                <Spinner animation="border" role="status" />
            </div>
        )
    }
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

export default Checkout