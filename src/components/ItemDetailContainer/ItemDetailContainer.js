import Spinner from 'react-bootstrap/Spinner'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { getProductsById } from "../../services/firebase/firestore/products"
import { useAsync } from "../hooks/useAsync"

const ItemDetailContainer = () => {
    const { itemId } = useParams()

    const getItemDetail = () => getProductsById(itemId)
    const {data:product, error, loading } = useAsync(getItemDetail, [itemId])

    if (loading) {
        return (
            <div className='pt-5 text-center'>
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center pt-5">
                <h2>Ocurrió un error en la carga del producto</h2>
            </div>
        )
    }

    return (
        <div className="pt-3 pb-5">
            <h1>Detalle de producto</h1>
            <div className="pt-3">
                <ItemDetail {...product} />
            </div>
        </div>
    )
}

export default ItemDetailContainer