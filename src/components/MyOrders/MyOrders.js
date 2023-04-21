import { useOrders } from "../../services/firebase/firestore/orders"
import { useAuth } from "../../context/AuthContext"
import { Spinner, Accordion } from "react-bootstrap"
import { useAsync } from "../hooks/useAsync"

const MyOrders = () => {
    const { user } = useAuth()
    const { getOrdersByUser } = useOrders()

    const getOrdersAsync = () => getOrdersByUser(user.uid)
    const { data: orders, error, loading } = useAsync(getOrdersAsync, [user.uid])

    if (loading) {
        return (
            <div className='pt-5 text-center'>
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center pt-5">
                <h2>Ocurrió un cargando los pedidos</h2>
            </div>
        )
    }
    return (
        <div className='pt-3'>
            <h1>Mis pedidos</h1>
            <div className="pt-3 pb-5">
                <div>
                    {orders.length === 0 ? (
                        <div>No has realizado ningún pedido aún.</div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="d-flex justify-content-center align-items-center pt-3">
                                <Accordion className="mx-auto w-40">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><h5>Pedido: {order.id} (Ver Detalle)</h5></Accordion.Header>
                                        <Accordion.Body>
                                            {order.items.map(item => (
                                                <div key={item.id}>
                                                    <div><b>Producto:</b> {item.name}</div>
                                                    <div><b>Cantidad:</b> {item.quantity}</div>
                                                    <div><b>Precio Unitario:</b> ${item.price}</div>
                                                    <hr />
                                                </div>
                                            ))}
                                            <div>Dirección de entrega: {order.buyer.address}</div>
                                            <h5>Total: ${order.total}</h5>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyOrders