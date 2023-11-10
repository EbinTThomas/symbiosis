import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SectionProducts({products}) {
    
    return (
        <section id="section_products">
            <div className="products_scrollbar">
                <div className="products_container">
                    {products.map(product => (
                        <Link to={`/product_detail/${product.id}`} className="product_card" key={product.id}>
                            <img src={product.get_image} alt="" className="product_thumbnail" />
                            <div className="product_details">
                                <h4 className="product_title">{product.name}</h4>
                                <p className="product_desc">{product.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Link to="/shop" className="load_more_btn">View More</Link>
            <aside className="section_tag">PRODUCTS</aside>
        </section>
    );
}

export default SectionProducts;
