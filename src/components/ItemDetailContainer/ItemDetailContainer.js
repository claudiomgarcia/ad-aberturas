import { useEffect, useState } from "react"
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState()

    const { itemId } = useParams()


    useEffect(() => {
        const productRef = doc(db, 'products', itemId)

        getDoc(productRef)
            .then(snapshot => {
                const data = snapshot.data()
                const productAdapted = { id: snapshot.id, ...data }
                setProduct(productAdapted)
            }).catch(error => {
                console.log(error)
            })
    }, [itemId])


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