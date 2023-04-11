import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"

const Cart = () => {

    const { cart } = useContext(CartContext)
    const { totalQuantity } = useContext(CartContext)
    return (
        <div>
            <h1>Carrito</h1>
            <div className="text-center">
                {
                    cart.map(prod => {
                        return (
                            <div key={prod.id}>
                                {prod.name} x {prod.quantity}
                            </div>
                        )
                    })
                }
                <div className="pt-5">
                { totalQuantity === 0 ? "No hay items en el carrito"  : <Link to='/checkout'><Button variant="success" size="sm">Finalizar Compra</Button></Link> }
                </div>
            </div>
        </div>
    )

}

export default Cart