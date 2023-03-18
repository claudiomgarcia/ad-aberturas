const products = [
    {
        id: '1',
        name: 'Puerta Doble Cerradura',
        price: 56000,
        category: 'puertas',
        img: '/images/puerta_doble.jpg',
        stock: 20,
        description: 'Doble chapa inyectada. Calibre 20. Doble Cerradura. Bisagra antibarreta'
    },
    { 
        id: '2', 
        name: 'Porton Barral Curvo', 
        price: 134000, 
        category: 'portones', 
        img: '/images/porton_barral.jpg', 
        stock: 10, 
        description: 'Chapa doble inyectada. 3 hojas. Bisagras antibarreta. Medida: 2.50x2.05' 
    },
    { 
        id: '3', 
        name: 'Ventana Doble', 
        price: 60000, 
        category: 'ventanas', 
        img: '/images/ventana_doble.jpg', 
        stock: 10, 
        description: 'Aluminio. Medida: 2.50x2.05' 
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}


export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 500)
    })
}