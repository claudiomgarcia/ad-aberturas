import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getCategories = () => {
    const categoriesRef = query(collection(db, 'categories'), orderBy('order'))

    return getDocs(categoriesRef)
        .then(snapshot => {
            const categoriesAdapted = snapshot.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data }
            })
            return categoriesAdapted
        })
        .catch(error => {
            return error
        })
}