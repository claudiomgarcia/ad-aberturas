import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Item = ({ id, name, price, img }) => {
    return (
        <div className='cardItem'>
            <div>
                <Card bg="Primary" border="success" style={{ width: '18rem', height: '18rem' }}>
                <Card.Header><Card.Title>{name}</Card.Title></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <img src={img} alt={name} style={{ height: 120 }} />
                        </Card.Text>
                        <Card.Text>
                            ${price}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="success" size="sm"><Link to={`/item/${id}`} className='linkDetails'>Ver detalle</Link></Button>
                        </Card.Footer>
                </Card>
            </div>
        </div>
    )
}

export default Item