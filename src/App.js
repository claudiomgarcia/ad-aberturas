import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext';
import { Notification, NotificationProvider } from './notification/NotificationService'
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NotificationProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path='/' element={<ItemListContainer greeting={'Todos nuestros productos'} />} />
              <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Productos filtrados por categoria'} />} />
              <Route path='/category/:categoryId/subcategory/:subcategoryId' element={<ItemListContainer greeting={'Productos filtrados por categoria'} />} />
              <Route path='/item/:itemId' element={<ItemDetailContainer />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
            <Footer/>
          </CartProvider>
        </NotificationProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
