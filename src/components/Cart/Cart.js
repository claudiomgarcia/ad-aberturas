import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { Button, Col, Row, Container, Image } from 'react-bootstrap';
import './Cart.css'
import { useNotification } from "../../notification/NotificationService"

const Cart = () => {
    const { setNotification } = useNotification()
    const { cart, totalQuantity, total, removeItem, clearCart } = useContext(CartContext);

    return (
        <div className='pt-3'>
            <h1>Carrito</h1>
            <div className="text-center pt-5">

                {
                    totalQuantity === 0 ? (
                        <div>Sin articulos en el carrito</div>
                    ) : (
                        <div className="shopping-cart dark">
                            <Container>
                                <div className="content">
                                    <Row>
                                        <Col md={12} lg={8}>
                                            <div className="items">
                                                {cart.map(prod => (
                                                    <div className="product" key={prod.id}>
                                                        <Row>
                                                            <Col md={3}>
                                                                <Image src={prod.img} alt={prod.name} style={{ width: '100%' }} />
                                                            </Col>
                                                            <Col md={8}>
                                                                <div className="info">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <div className="product-name">
                                                                                <Link to={`/item/${prod.id}`}>{prod.name}</Link>
                                                                                <div className="product-info">
                                                                                    <div>Descripción: <span className="value">{prod.description}</span></div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3}>
                                                                            <label>Cantidad: {prod.quantity}</label>
                                                                        </Col>
                                                                        <Col md={3}>
                                                                            <span>$ {prod.price}</span>
                                                                        </Col>
                                                                        <Col md={2}>
                                                                            <Button variant="secondary" size="sm" onClick={() => {
                                                                                setNotification('success', `Se eliminó correctamente ${prod.quantity} ${prod.name}`, 2);
                                                                                removeItem(prod.id);
                                                                            }}>Eliminar</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
                                        <Col md={12} lg={4}>
                                            <div className="summary">
                                                <h3>Resumen</h3>
                                                <div className="summary-item"><span className="text">Total: </span>${total}</div>
                                                <Link to='/checkout'><Button variant="success" size="lg">Finalizar Compra</Button></Link>
                                                <div><Button variant="danger" size="sm" onClick={clearCart}>Vaciar Carrito</Button></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart