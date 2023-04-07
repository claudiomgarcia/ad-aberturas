import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext';
import { Notification, NotificationProvider } from './notification/NotificationService'

const App = () => {
  return (
    <div>
      <NotificationProvider>
        <BrowserRouter>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path='/' element={<ItemListContainer greeting={'Todos nuestros productos'} />} />
              <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Productos filtrados por categoria'} />} />
              <Route path='/category/:categoryId/subcategory/:subcategoryId' element={<ItemListContainer greeting={'Productos filtrados por categoria'} />} />
              <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </NotificationProvider>
    </div>
  )
}

export default App;
