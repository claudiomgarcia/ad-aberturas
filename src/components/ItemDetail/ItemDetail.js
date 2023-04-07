import { useContext, useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { useNotification } from '../../notification/NotificationService'

const ItemDetail = ({ id, name, price, img, category, description, stock }) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem } = useContext(CartContext)
    const { setNotification} = useNotification()


    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }
        setQuantity(quantity)
        addItem(productToAdd)
        setNotification('success',`Se agregó correctamente ${quantity} ${name}`)
    }

    return (
        <div className='itemDetail'>
            <h3>{name}</h3>
            <img src={img} alt={name} style={{ width: 400 }} />
            <h4>Precio: ${price}</h4>
            <div className='p-1'>Descripción: {description}</div>
            {
                quantity > 0 ? (
                    <div className='pb-3'>
                    <Link to='/cart'><Button variant="success" size="sm">Finalizar Compra</Button></Link>
                    </div>
                ) : (
                    <ItemCount onAdd={handleOnAdd} stock={stock} />
                )
            }
        </div>
    )
}

export default ItemDetail