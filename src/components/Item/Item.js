import { Link } from "react-router-dom"
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({ id, name, price, img }) => {
    const value = useContext(CartContext)
    return (
        <div className='cardItem'>
            <div>
                <Card border="success" style={{ width: '18rem', height: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            <img src={img} alt={name} style={{ height: 120 }} />
                        </Card.Text>
                        <Card.Text>
                            ${price}
                        </Card.Text>

                        <Button variant="success" size="sm"><Link to={`/item/${id}`} className='linkDetails'>Ver detalle</Link></Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Item