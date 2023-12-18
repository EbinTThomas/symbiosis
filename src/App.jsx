import { Route, Routes } from 'react-router-dom'
import ShopPage from './pages/Shop/ShopPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import { useLayoutContext } from './pages/Common/LayoutContext'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import About from './pages/About/About'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
import NewsDetail from './pages/NewsDetail.jsx/NewsDetail'
import Wishlist from './pages/Wishlist/Wishlist'
import SearchResults from './pages/SearchResults/SearchResults'
import RequireAuth from './pages/Common/RequireAuth'
import Payment from './pages/Payment/Payment'
import NotFound from './pages/Common/NotFound'
import Orders from './pages/Orders/Orders'
import './App.css'
// import EmailVerifyOtp from './pages/EmailVerification/EmailVerify'
import Auth from './pages/Auth/Auth'
import LandingPage from './pages/LandingPage/LandingPage'

function App() {
  const { theme } = useLayoutContext();

  return (
    <div id="app" data-theme={theme}>
      <Routes>
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/signup" element={<Auth />} />
        <Route path="/auth/verify_mail" element={<Auth />} />
        <Route path="/auth/verified" element={<Auth />} />
        <Route path="/auth/password_reset/request" element={<Auth />} />
        <Route path="/auth/password_reset/email" element={<Auth />} />
        <Route path="/auth/password_reset/confirmation" element={<Auth />} />
        <Route path="/auth/password_reset/success" element={<Auth />} />
        <Route path="/" element={<LandingPage />} />
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
    </div>
  )
}

export default App
