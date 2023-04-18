import { useState, useEffect } from "react"
import { useOrders } from "../../services/firebase/firestore/orders"
import { useAuth } from "../../context/AuthContext"
import { Spinner } from "react-bootstrap"

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const { getOrdersByUser } = useOrders()

    useEffect(() => {
        getOrdersByUser(user.uid).then(orders => {
            setOrders(orders)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [user.uid]) //eslint-disable-line

    if (loading) {
        return (
            <div className='pt-5 text-center'>
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    return (
        <div className='pt-3'>
            <h1>Mis pedidos</h1>
            <div className="text-center pt-5">
                <div>                    
                    {
                        orders.map(orders => {
                            return <div key={orders.id}>Orden: {orders.id}</div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MyOrders