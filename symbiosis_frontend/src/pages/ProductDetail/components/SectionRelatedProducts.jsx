import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SectionRelatedProducts() {
  const [products, setProducts] = useState([
    {
      "id": "1",
      "name": "Protein Powder Mockup",
      "desc": "This is description for Protein Powder Mockup manufactured by ABC Company.",
      "thumbnail": "https://www.mockupworld.co/wp-content/uploads/2022/04/free-protein-powder-jar-mockup-psd.jpg"
    },
    {
      "id": "2",
      "name": "Nutrient Supplement",
      "desc": "This is description for Protein Powder Mockup manufactured by XYZ Company.",
      "thumbnail": "https://www.pacagemockup.com/wp-content/uploads/2021/02/Free-Protein-Powder-Bottle-Container-Mockup-PSD.jpg"
    },
    {
      "id": "3",
      "name": "Whey - the doctor's choice",
      "desc": "This is description for Protein Powder Mockup manufactured by ABC Company.",
      "thumbnail": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ad4cf98596453.5edfcab818269.jpg"
    },
    {
      "id": "3",
      "name": "Whey - the doctor's choice",
      "desc": "This is description for Protein Powder Mockup manufactured by ABC Company.",
      "thumbnail": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ad4cf98596453.5edfcab818269.jpg"
    },
    {
      "id": "3",
      "name": "Whey - the doctor's choice",
      "desc": "This is description for Protein Powder Mockup manufactured by ABC Company.",
      "thumbnail": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ad4cf98596453.5edfcab818269.jpg"
    },
    {
      "id": "3",
      "name": "Whey - the doctor's choice",
      "desc": "This is description for Protein Powder Mockup manufactured by ABC Company.",
      "thumbnail": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ad4cf98596453.5edfcab818269.jpg"
    },
  ]);

  return (
    <section className="section_related_products">
      <h3 className="rp_title">Related Products</h3>
      <div className="rp_products_container">
        {products.map(product => (
          <Link to={`/shop/${product.id}`} className="rp_product_card" key={product.id}>
            <img src={product.thumbnail} alt="" className="rp_product_thumb" />
            <div className="rp_product_card_details">
              <h4 className="rp_product_name">{product.name}</h4>
              <p className="rp_product_desc">{product.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SectionRelatedProducts;
