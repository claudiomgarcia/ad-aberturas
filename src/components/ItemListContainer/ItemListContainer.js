import { useEffect, useState } from 'react'
import { getProducts, getProductsByCategory } from "../../asyncMock"
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { categoryId } = useParams()

    useEffect(() => {
        const asyncFunction = categoryId ? getProductsByCategory : getProducts

        asyncFunction(categoryId)
            .then(products => {
                setProducts(products)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [categoryId])

    if (loading) {
        return (
            <div className="text-center">
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
        <div className="text-center">
            <h1>{greeting}</h1>
            <div className='pt-5'>
                <ItemList products={products} />
            </div>
        </div>
    )
}

export default ItemListContainer