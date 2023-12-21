import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';

function SectionProductList({ products }) {
  const token = localStorage.getItem('token');
  const [wishList, setWishList] = useState([]);
  const [wishListProductIds, setWishListProductIds] = useState([]);

  const toggleWishlist = async (product) => {
    // Check if the product is already in the wishlist
    if (wishListProductIds.includes(product.id)) {
      // Remove the product from the wishlist
      try {
        const response = await axios.delete(`/api/wishlist-edit/${product.id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          }
        });
        // Remove the product from the wishList and update wishListProductIds
        setWishList(wishList.filter((item) => item.id !== product.id));
        setWishListProductIds(wishListProductIds.filter((id) => id !== product.id));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Add the product to the wishlist
      try {
        const response = await axios.put(`/api/wishlist-edit/${product.id}/`,
          {
            data: '1'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            }
          });
        // Add the product to the wishList and update wishListProductIds
        setWishList([...wishList, product]);
        setWishListProductIds([...wishListProductIds, product.id]);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      });
      // Store the wishlisted products and their IDs in state
      setWishList(response.data.products);
      setWishListProductIds(response.data.products.map(product => product.id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  const formatIndianRupee = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="section_product_list">
      {products.map(product => (
        <div to={`/product_detail/${product.id}`} className="product_card" key={product.id}>
          <button className="add_to_wishlist_btn" onClick={() => toggleWishlist(product)}>
            {wishListProductIds.includes(product.id) ? (
              <svg className="active" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.4 5.25C5.61914 5.25 3.25 7.3293 3.25 10.0298C3.25 11.8927 4.12235 13.4612 5.27849 14.7604C6.43066 16.0552 7.91714 17.142 9.26097 18.0516L11.5796 19.6211C11.8335 19.793 12.1665 19.793 12.4204 19.6211L14.739 18.0516C16.0829 17.142 17.5693 16.0552 18.7215 14.7604C19.8777 13.4612 20.75 11.8927 20.75 10.0298C20.75 7.3293 18.3809 5.25 15.6 5.25C14.1665 5.25 12.9052 5.92214 12 6.79183C11.0948 5.92214 9.83347 5.25 8.4 5.25Z" fill="black" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 10.0298C3.25 7.3293 5.61914 5.25 8.4 5.25C9.83347 5.25 11.0948 5.92214 12 6.79183C12.9052 5.92214 14.1665 5.25 15.6 5.25C18.3809 5.25 20.75 7.3293 20.75 10.0298C20.75 11.8797 19.9611 13.5064 18.8682 14.8815C17.7771 16.2543 16.35 17.4193 14.9835 18.366C14.4615 18.7276 13.9335 19.0611 13.4503 19.3072C12.9965 19.5383 12.4747 19.75 12 19.75C11.5253 19.75 11.0035 19.5383 10.5497 19.3072C10.0665 19.0611 9.53846 18.7276 9.01653 18.366C7.65005 17.4193 6.22287 16.2543 5.13182 14.8815C4.03888 13.5064 3.25 11.8797 3.25 10.0298ZM8.4 6.75C6.32075 6.75 4.75 8.2791 4.75 10.0298C4.75 11.4333 5.34579 12.74 6.30609 13.9482C7.26828 15.1588 8.56292 16.2269 9.87074 17.133C10.3656 17.4758 10.8317 17.7675 11.2305 17.9706C11.6586 18.1886 11.9067 18.25 12 18.25C12.0933 18.25 12.3414 18.1886 12.7695 17.9706C13.1683 17.7675 13.6344 17.4758 14.1293 17.133C15.4371 16.2269 16.7317 15.1588 17.6939 13.9482C18.6542 12.74 19.25 11.4333 19.25 10.0298C19.25 8.2791 17.6792 6.75 15.6 6.75C14.4058 6.75 13.2908 7.46342 12.5946 8.36892C12.4526 8.55356 12.2329 8.66176 12 8.66176C11.7671 8.66176 11.5474 8.55356 11.4054 8.36892C10.7092 7.46342 9.59415 6.75 8.4 6.75Z" fill="black" />
              </svg>
            )}
          </button>
          <Link to={`/product_detail/${product.id}`}>
            <img src={product.get_image ? product.get_image : '/assets/img/temp.jpg'} alt="" className="product_thumbnail" />
            <div className="product_details">
              <h4 className="product_title">{product.name}</h4>
              <div className="product_brand_name">{product.brand.name}</div>
              {/* <p className="product_desc">{product.description}</p> */}
              <div className="product_rating_flexbox">
                <div className="product_rating_container">
                  <div className="star_ratings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.8643 2.99811C12.4789 2.33396 11.5198 2.33396 11.1344 2.99811L8.42034 7.67542C8.22997 8.00351 7.90092 8.2274 7.52585 8.28405L2.43954 9.05227C1.58526 9.1813 1.2856 10.2599 1.9509 10.8111L5.74 13.9503C6.09074 14.2409 6.25566 14.6993 6.17045 15.1467L5.17929 20.3519C5.0226 21.1747 5.88639 21.814 6.62754 21.4238L11.4169 18.9019C11.7815 18.71 12.2172 18.71 12.5817 18.9019L17.3711 21.4238C18.1123 21.814 18.9761 21.1747 18.8194 20.3519L17.8282 15.1467C17.743 14.6993 17.9079 14.2409 18.2587 13.9503L22.0477 10.8111C22.7131 10.2599 22.4134 9.1813 21.5591 9.05227L16.4728 8.28405C16.0977 8.2274 15.7687 8.00351 15.5783 7.67542L12.8643 2.99811Z" fill="black" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.8643 2.99811C12.4789 2.33396 11.5198 2.33396 11.1344 2.99811L8.42034 7.67542C8.22997 8.00351 7.90092 8.2274 7.52585 8.28405L2.43954 9.05227C1.58526 9.1813 1.2856 10.2599 1.9509 10.8111L5.74 13.9503C6.09074 14.2409 6.25566 14.6993 6.17045 15.1467L5.17929 20.3519C5.0226 21.1747 5.88639 21.814 6.62754 21.4238L11.4169 18.9019C11.7815 18.71 12.2172 18.71 12.5817 18.9019L17.3711 21.4238C18.1123 21.814 18.9761 21.1747 18.8194 20.3519L17.8282 15.1467C17.743 14.6993 17.9079 14.2409 18.2587 13.9503L22.0477 10.8111C22.7131 10.2599 22.4134 9.1813 21.5591 9.05227L16.4728 8.28405C16.0977 8.2274 15.7687 8.00351 15.5783 7.67542L12.8643 2.99811Z" fill="black" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.8643 2.99811C12.4789 2.33396 11.5198 2.33396 11.1344 2.99811L8.42034 7.67542C8.22997 8.00351 7.90092 8.2274 7.52585 8.28405L2.43954 9.05227C1.58526 9.1813 1.2856 10.2599 1.9509 10.8111L5.74 13.9503C6.09074 14.2409 6.25566 14.6993 6.17045 15.1467L5.17929 20.3519C5.0226 21.1747 5.88639 21.814 6.62754 21.4238L11.4169 18.9019C11.7815 18.71 12.2172 18.71 12.5817 18.9019L17.3711 21.4238C18.1123 21.814 18.9761 21.1747 18.8194 20.3519L17.8282 15.1467C17.743 14.6993 17.9079 14.2409 18.2587 13.9503L22.0477 10.8111C22.7131 10.2599 22.4134 9.1813 21.5591 9.05227L16.4728 8.28405C16.0977 8.2274 15.7687 8.00351 15.5783 7.67542L12.8643 2.99811Z" fill="black" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.8643 2.99811C12.4789 2.33396 11.5198 2.33396 11.1344 2.99811L8.42034 7.67542C8.22997 8.00351 7.90092 8.2274 7.52585 8.28405L2.43954 9.05227C1.58526 9.1813 1.2856 10.2599 1.9509 10.8111L5.74 13.9503C6.09074 14.2409 6.25566 14.6993 6.17045 15.1467L5.17929 20.3519C5.0226 21.1747 5.88639 21.814 6.62754 21.4238L11.4169 18.9019C11.7815 18.71 12.2172 18.71 12.5817 18.9019L17.3711 21.4238C18.1123 21.814 18.9761 21.1747 18.8194 20.3519L17.8282 15.1467C17.743 14.6993 17.9079 14.2409 18.2587 13.9503L22.0477 10.8111C22.7131 10.2599 22.4134 9.1813 21.5591 9.05227L16.4728 8.28405C16.0977 8.2274 15.7687 8.00351 15.5783 7.67542L12.8643 2.99811Z" fill="black" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.8643 2.99811C12.4789 2.33396 11.5198 2.33396 11.1344 2.99811L8.42034 7.67542C8.22997 8.00351 7.90092 8.2274 7.52585 8.28405L2.43954 9.05227C1.58526 9.1813 1.2856 10.2599 1.9509 10.8111L5.74 13.9503C6.09074 14.2409 6.25566 14.6993 6.17045 15.1467L5.17929 20.3519C5.0226 21.1747 5.88639 21.814 6.62754 21.4238L11.4169 18.9019C11.7815 18.71 12.2172 18.71 12.5817 18.9019L17.3711 21.4238C18.1123 21.814 18.9761 21.1747 18.8194 20.3519L17.8282 15.1467C17.743 14.6993 17.9079 14.2409 18.2587 13.9503L22.0477 10.8111C22.7131 10.2599 22.4134 9.1813 21.5591 9.05227L16.4728 8.28405C16.0977 8.2274 15.7687 8.00351 15.5783 7.67542L12.8643 2.99811Z" fill="black" />
                    </svg>
                  </div>
                  <span className="total_ratings">(9,784)</span>
                </div>
                <div className="best_seller_tag"><img src="./assets/img/best.png" alt="" /></div>
              </div>
              <div className="product_price">
                {
                  product.discount > 0
                  && <>
                    <span className="off_percent">-{product.discount}%</span>
                    <span className="product_org_price">{formatIndianRupee(product.mrp)}</span>
                  </>
                }{formatIndianRupee(product.price)}</div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default SectionProductList;
