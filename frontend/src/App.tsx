import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import ProductDetail from './components/ProductDetail';
import Unauthorized from './pages/Unauthorized';
import MyProducts from './pages/MyProducts';
import NewProduct from './pages/NewProduct';
import OnSale from "./pages/OnSale";
import ResetPassword from './pages/ResetPassword';


import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'nes.css/css/nes.min.css';
import SellerShop from './pages/SellerShop';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
                path="/my-products"
                element={
                  <ProtectedRoute>
                    <MyProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new-product"
                element={
                  <ProtectedRoute>
                    <NewProduct />
                  </ProtectedRoute>
                }
              />
              <Route path="/onsale" element={<OnSale />} />
              <Route path="/reset/:token" element={<ResetPassword />} />
              <Route path="/vendeur/:id" element={<SellerShop />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="/my-products" element={<MyProducts />} />

          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;