import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping}from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'


const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    return ( 
        <div className="divPadreIconoCarrito d-flex align-items-center">
            <FontAwesomeIcon className="icono__carrito" icon={faCartShopping} ></FontAwesomeIcon>
            <div className="valorCarrito">
                {totalQuantity}
            </div>
        </div>
    )
}

export default CartWidget