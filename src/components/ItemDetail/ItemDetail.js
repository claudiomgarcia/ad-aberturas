const ItemDetail = ({ name, price, img, description }) => {
    return (
        <div className='itemDetail'>
            <h2>{name}</h2>
            <img src={img} alt={name} style={{ width: 400}}/>
            <h3>Precio: ${price}</h3>
            <p>Descripción: {description}</p>
        </div>
    )
}

export default ItemDetail