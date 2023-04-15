import { memo } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { getProducts } from '../../services/firebase/firestore/products'
import { useAsync } from '../hooks/useAsync'
const ItemListMemo = memo(ItemList)

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams()

    const getProductsWithCategory = ()  => getProducts(categoryId)
    const {data:products, error, loading} = useAsync(getProductsWithCategory, [categoryId])

    if (loading) {
        return (
            <div className='pt-5 text-center'>
                <Spinner animation="border" role="status" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center">
                <h2>Ocurrió un error en la carga de los productos</h2>
            </div>
        )
    }

    return (
        <div className="text-center pt-3 pb-5">
            <h1>{greeting}</h1>
            <div className='pt-5'>
                <ItemListMemo products={products} />
            </div>
        </div>
    )
}

export default ItemListContainer