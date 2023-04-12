import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
import './Cart.css'
import { useNotification } from "../../notification/NotificationService"

const Cart = () => {
    const { setNotification } = useNotification()
    const { cart, totalQuantity, total, removeItem } = useContext(CartContext);

    return (
        <div className='pt-3'>
            <h1>Carrito</h1>
            <div className="text-center pt-5">

                {
                    totalQuantity === 0 ? (
                        <div>Sin articulos en el carrito</div>
                    ) : (
                        <div className="shopping-cart dark">
                            <div className="container">
                                <div className="content">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-8">
                                            <div className="items">
                                                {
                                                    cart.map(prod => {
                                                        return (
                                                            <div className="product" key={prod.id}>
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <img src={prod.img} alt={prod.name} style={{ width: '100%' }} />
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <div className="info">
                                                                            <div className="row">
                                                                                <div className="col-md-4 product-name">
                                                                                    <div className="product-name">
                                                                                        {prod.name}
                                                                                        <div className="product-info">
                                                                                            <div>Descripción: <span className="value">{prod.description}</span></div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3 quantity">
                                                                                    <label>Cantidad: {prod.quantity}</label>
                                                                                </div>
                                                                                <div className="col-md-3 price">
                                                                                    <span>$ {prod.price}</span>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <Button variant="secondary" size="sm" onClick={() => {
                                                                                        setNotification('success', `Se eliminó correctamente ${prod.quantity} ${prod.name}`, 2)
                                                                                        removeItem(prod.id)
                                                                                    }}>Eliminar</Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-4">
                                            <div className="summary">
                                                <h3>Resumen</h3>
                                                <div className="summary-item"><span className="text">Total</span><span className="price">{total}</span></div>
                                                <Link to='/checkout'><Button variant="success" size="lg">Finalizar Compra</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart