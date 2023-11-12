import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import ShopPage from './pages/Shop/ShopPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import { LayoutProvider } from './pages/Common/LayoutContext'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import About from './pages/About/About'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
import NewsDetail from './pages/NewsDetail.jsx/NewsDetail'
import Wishlist from './pages/Wishlist/Wishlist'
import SearchResults from './pages/SearchResults/SearchResults'
import PasswordReset from './pages/PasswordReset/PasswordReset'
import RequireAuth from './pages/Common/RequireAuth'
import Payment from './pages/Payment/Payment'
import NotFound from './pages/Common/NotFound'
import Orders from './pages/Orders/Orders'
import './App.css'

function App() {
  return (
    <div id="app" data-theme="dark">
      <LayoutProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/password_reset/request" element={<PasswordReset step={1} />} />
          <Route path="/password_reset/email" element={<PasswordReset step={2} />} />
          <Route path="/password_reset/confirmation" element={<PasswordReset step={3} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/" element={<ShopPage />} />
          <Route path="/shop/:search_key" element={<SearchResults />} />
          <Route path="/product_detail/:product_id" element={<ProductDetail />} />
          <Route element={<RequireAuth />}>
            <Route path="/shopping_cart" element={<ShoppingCart />} />
            <Route path="/shopping_cart/delivery_details" element={<ShoppingCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment/success" element={<Payment />} />
            <Route path="/payment/cancelled" element={<Payment />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </LayoutProvider>
    </div>
  )
}

export default App
