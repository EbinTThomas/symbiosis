import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import SectionProductList from './components/SectionProductList'
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import '../../static/styles/WishList.css';

function Wishlist() {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      console.log(token)
      const response = await axios.get(`/api/wishlist/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const removeFromWishlist = async (product) => {
    try {
      const response = await axios.delete(`/api/wishlist-edit/${product.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      });
      // Remove the product from the wishList and update wishListProductIds
      setProducts(products.filter((item) => item.id !== product.id));
      setProductIds(productIds.filter((id) => id !== product.id));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <Header />
      <section className={`section_content wishlist ${isLoading ? 'loading' : products.length === 0 && 'loading'}`}>
        {
          isLoading
            ? <CircularProgress color="warning" />
            : products.length > 0
              ? <SectionProductList products={products} removeFromWishlist={removeFromWishlist} />
              : <div className="center_text">
                <span>Nothing in WishList</span>
                <Link to="/shop" className="shop_more_btn">
                  Grab Some Products
                </Link>
              </div>
        }
      </section>
    </>
  )
}

export default Wishlist