import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { categoryId } = useParams()

    useEffect(() => {
        const productsRef = categoryId 
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')

        getDocs(productsRef)
            .then(snapshot => {
                const productsAdapted = snapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })

                setProducts(productsAdapted)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [categoryId])

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
        <div className="text-center pt-3">
            <h1>{greeting}</h1>
            <div className='pt-5'>
                <ItemList products={products} />
            </div>
        </div>
    )
}

export default ItemListContainer