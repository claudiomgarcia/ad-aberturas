import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Button from 'react-bootstrap/esm/Button'

const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    return (
        <div className="d-flex align-items-center">
            <Button variant="success"><FontAwesomeIcon className="icono__carrito" icon={faCartShopping} /> {totalQuantity}</Button>
        </div>
    )
}

export default CartWidget