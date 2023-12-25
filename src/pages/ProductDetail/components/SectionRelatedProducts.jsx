import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../api/axios';
import StarRating from '../../Shop/components/StarRating';

function SectionRelatedProducts({ product }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { product_id } = useParams();

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`/api/product/search/item/?brand_name=${product.brand.name}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setRelatedProducts(response.data);
    } catch (error) {
      // Error handling
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
                      <StarRating averageRating={product.get_average_rating.rating} />
                    </div>
                    <span className="total_ratings">({product.get_average_rating.count})</span>
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
