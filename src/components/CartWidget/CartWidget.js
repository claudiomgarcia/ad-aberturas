import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from "react-router-dom";

const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    const navigate = useNavigate()

    return (
        <div className="d-flex align-items-center" onClick={() => navigate('/cart')}>
            <Button variant="success"><FontAwesomeIcon className="icono__carrito" icon={faCartShopping} /> {totalQuantity}</Button>
        </div>
    )
}

export default CartWidget