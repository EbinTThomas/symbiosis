import { useState } from 'react'
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

function App() {
  return (
    <LayoutProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:product_id" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        {/* <Route path="/address" element={<ShoppingCart />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </LayoutProvider>
  )
}

export default App
