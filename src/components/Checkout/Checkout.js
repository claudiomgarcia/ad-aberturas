import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from '../../services/firebase/firebaseConfig'
import { documentId, getDocs, query, collection, where, writeBatch, addDoc } from "firebase/firestore"
import Button from "react-bootstrap/esm/Button"
import Spinner from "react-bootstrap/esm/Spinner"
import { useNotification } from "../../notification/NotificationService"
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(false)
    const { cart, total, clearCart } = useContext(CartContext)
    const { setNotification } = useNotification()
    const navigate = useNavigate()

    const handleConfirm = async (userData) => {
        try {
            setLoading(true)

            const objOrder = {
                buyer: {
                    name: 'Claudio Garcia',
                    phone: '1234567',
                    address: 'Calle falsa 123'
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
        <div>
            <h1>Checkout</h1>
            <div className="text-center pt-5">
                {orderId ? <h4>El id de su orden es: <b>{orderId}</b></h4> : <Button variant="success" size="sm" onClick={handleConfirm}>Generar Orden</Button>}
            </div>
        </div>
    )


}

export default Checkout