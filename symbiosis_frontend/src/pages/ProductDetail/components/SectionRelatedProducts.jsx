import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';

function SectionRelatedProducts({product}) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`/api/product/search/?brand_name=${product.brand.name}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setRelatedProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  return (
    <section className="section_related_products">
      <h3 className="rp_title">Related Products</h3>
      <div className="rp_products_container">
        {relatedProducts.map(product => (
          <Link to={`/product_detail/${product.id}`} className="rp_product_card" key={product.id}>
            <img src={product.get_image} alt="" className="rp_product_thumb" />
            <div className="rp_product_card_details">
              <h4 className="rp_product_name">{product.name}</h4>
              <p className="rp_product_desc">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SectionRelatedProducts;
