import Item from "../Item/Item"

const ItemList = ({ products }) => {
    return (
        <div className='cardItem'>
            {
                 products.map(product => {
                    return <Item key={product.id} {...product}/>
                })
            }
        </div>
    )
}

export default ItemList