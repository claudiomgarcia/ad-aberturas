import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping}from '@fortawesome/free-solid-svg-icons'

const CartWidget = () => {
    return ( 
        <div className="divPadreIconoCarrito d-flex align-items-center">
            <FontAwesomeIcon className="icono__carrito" icon={faCartShopping} ></FontAwesomeIcon>
            <div className="valorCarrito">
                {0}
            </div>
        </div>
    )
}

export default CartWidget