import { useContext, useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'

const ItemDetail = ({ id, name, price, img, category, description, stock }) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem } = useContext(CartContext)


    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }
        setQuantity(quantity)
        addItem(productToAdd)
    }

    return (
        <div className='itemDetail'>
            <h2>{name}</h2>
            <img src={img} alt={name} style={{ width: 400 }} />
            <h3>Precio: ${price}</h3>
            <div>Descripción: {description}</div>
            {
                quantity > 0 ? (
                    <Link to='/cart'><Button variant="success" size="sm">Finalizar Compra</Button></Link>
                ) : (
                    <ItemCount onAdd={handleOnAdd} stock={stock} />
                )
            }
        </div>
    )
}

export default ItemDetail