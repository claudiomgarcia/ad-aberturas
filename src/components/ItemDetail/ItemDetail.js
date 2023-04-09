import { useContext, useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { useNotification } from '../../notification/NotificationService'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ItemDetail = ({ id, name, price, img, category, description, stock }) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem } = useContext(CartContext)
    const { setNotification } = useNotification()


    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity
        }
        setQuantity(quantity)
        addItem(productToAdd)
        setNotification('success', `Se agregó correctamente ${quantity} ${name}`)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col><img src={img} alt={name} style={{ width: '30rem' }} /></Col>
                    <Col>
                        <h3>{name}</h3>
                        <h5>Precio: $ {price}</h5>
                        Stock: {stock}
                        <div className='pb-3'>Descripción: {description}</div>
                        {
                            quantity > 0 ? (
                                <div className='pb-3'>
                                    <Link to='/cart'><Button variant="success" size="sm">Finalizar Compra</Button></Link>
                                </div>
                            ) : (
                                <div className='pb-5'>
                                    <ItemCount onAdd={handleOnAdd} stock={stock} />
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ItemDetail