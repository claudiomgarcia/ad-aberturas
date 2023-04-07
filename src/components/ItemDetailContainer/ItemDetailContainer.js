import { useEffect, useState } from "react"
import { getProductById } from "../../asyncMock"
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from "react-router-dom"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()
    const { itemId } = useParams()

    useEffect(() => {
        getProductById(itemId).then(response => {
            setProduct(response)
        }).catch(error => {
            console.log(error)
        })
    }, [itemId])

    return (
        <div className="text-center">
            <h2>Detalle de producto</h2>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer