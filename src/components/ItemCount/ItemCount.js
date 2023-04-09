import { useState } from 'react'
import Button from 'react-bootstrap/Button';

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
    const [quantity, setQuantity] = useState(initial)

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1)
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div>
            <div className="mb-2">
                <Button variant="success" size="sm" onClick={decrement}>-</Button>
                <span className='p-1'>{quantity}</span>
                <Button variant="success" size="sm" onClick={increment}>+</Button>
            </div>
            <div className='pb-3'>
                <Button variant="success" size="sm" onClick={() => {
                    setQuantity(initial)
                    onAdd(quantity)
                }}>Agregar al carrito</Button>
            </div>
        </div>
    )

}
export default ItemCount