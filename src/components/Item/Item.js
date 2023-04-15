import { Link } from "react-router-dom"
import { Button, Card } from 'react-bootstrap'

const Item = ({ id, name, price, img, stock }) => {
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
                        {stock > 0 ? (
                            <Button variant="success" size="sm"><Link to={`/item/${id}`} className='linkDetails'>Ver detalle</Link></Button>
                        ) : (
                            <Button variant="secondary" size="sm" disabled>Sin Stock</Button>
                        )}
                    </Card.Footer>
                </Card>
            </div>
        </div >
    )
}

export default Item