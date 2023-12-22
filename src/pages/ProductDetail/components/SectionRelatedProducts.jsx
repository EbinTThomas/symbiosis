import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../api/axios';

function SectionRelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { product_id } = useParams();

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`/api/product/search/item/?query=${product.brand.name}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setRelatedProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  const formatIndianRupee = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    relatedProducts.length !== 1 &&
    <section className="section_related_products">
      <h3 className="rp_title">Related Products</h3>
      <div className="rp_products_container">
        {relatedProducts.map(product => (
          product.id !== product_id &&
          <div to={`/product_detail/${product.id}`} className="product_card" key={product.id}>
            <Link to={`/product_detail/${product.id}`}>
              <img src={product.get_image ? product.get_image : '/assets/img/temp.jpg'} alt="" className="product_thumbnail" />
              <div className="product_details">
                <h4 className="product_title">{product.name}</h4>
                <div className="product_brand_name">{product.brand.name}</div>
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
      </div>
    </section>
  );
}

export default SectionRelatedProducts;
