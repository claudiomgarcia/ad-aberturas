import { useContext, useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem } = useContext(CartContext)
    const { user } = useAuth()
    console.log(quantity)
    
    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, stock, img, description
        }
        setQuantity(quantity)
        addItem(productToAdd)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col sm>
                        <img src={img} alt={name} style={{ width: '100%' }} />
                    </Col>
                    <Col sm>
                        <h3>{name}</h3>
                        <h5>Precio: $ {price}</h5>
                        <div className='pb-3'>Descripción: {description}</div>
                        <div className='pb-5'>
                            {
                                user ? (
                                    stock > 0 ? (
                                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                                    ) : (
                                        <div>Sin stock disponible</div>
                                    )
                                ) : (
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) => (isActive ? 'ActiveOption' : 'Option')}
                                    >
                                        <Button variant="success">Login</Button>
                                    </NavLink>
                                )
                            }


                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ItemDetail