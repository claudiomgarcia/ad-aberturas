import { createContext, useState } from "react"
import { useNotification } from "../notification/NotificationService"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log(cart)

    const { setNotification } = useNotification()

    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            setCart(prev => [...prev, productToAdd])
            setNotification('success', `Se agregó correctamente ${productToAdd.quantity} ${productToAdd.name}`, 2)
        } else {
            const updatedCart = cart.map(prod => {
                if (prod.id === productToAdd.id) {
                    let newQuantity = prod.quantity + productToAdd.quantity
                    if (newQuantity > prod.stock) {
                        newQuantity = prod.stock
                        setNotification('success', `El stock disponible es de ${prod.stock}`, 2)
                    } else {
                        setNotification('success', `Se agregó correctamente ${productToAdd.quantity} ${productToAdd.name}`, 2)
                    }
                    return { ...prod, quantity: newQuantity }
                } else {
                    return prod
                }
            })

            setCart(updatedCart)
        }
    }

    const removeItem = (id) => {
        const cartUpdated = cart.filter(prod => prod.id !== id)
        setCart(cartUpdated)
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const getTotalQuantity = () => {
        let totalQuantity = 0
        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })
        return totalQuantity
    }

    const totalQuantity = getTotalQuantity()

    const getTotal = () => {
        let total = 0
        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })
        return total
    }

    const total = getTotal()

    const clearCart = () => {
        setCart([])
        setNotification('success', `Se vació el carrito`, 2)
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, totalQuantity, total, clearCart,isInCart }}>
            {children}
        </CartContext.Provider>
    )
}