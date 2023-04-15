import { db } from "../firebaseConfig"
import { documentId, getDocs, query, collection, where, writeBatch, addDoc } from "firebase/firestore"

export const useOrders = () => {
    const createOrder = async (objOrder,cart) => {
        try {
            const ids = cart.map(prod => prod.id)
            const productRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const productsAddedFromFirestore = await getDocs(productRef)
            const { docs } = productsAddedFromFirestore

            const batch = writeBatch(db)
            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc, ...dataDoc })
                }
            })

            if (outOfStock.length === 0) {
                batch.commit()
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                return { result: 'orderCreated', id: orderAdded.id }

            } else {
                return { result: 'outOfStockError', products: outOfStock }
            }
        } catch (error) {
            return error
        }

    }
    return {
        createOrder
    }
}

