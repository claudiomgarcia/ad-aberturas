import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({ id, name, price, img }) => {
    return (
        <div className='cardItem'>
            <div>
                <Card style={{ width: '18rem', height: '16rem' }}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            <img src={img} alt={name} style={{ height: 120 }} />
                            <p>${price}</p>
                        </Card.Text>
                        <Button variant="primary" text="primary"><Link to={`/item/${id}`} className='linkDetails'>Ver detalle</Link></Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Item