import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SectionProducts() {
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
        }
      ]);

    return (
        <section id="section_products">
            <div className="products_scrollbar">
                <div className="products_container">
                    {products.map(product => (
                        <Link to={`/shop/${product.id}`} className="product_card" key={product.id}>
                            <div className="add_to_wishlist_btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 10.0298C3.25 7.3293 5.61914 5.25 8.4 5.25C9.83347 5.25 11.0948 5.92214 12 6.79183C12.9052 5.92214 14.1665 5.25 15.6 5.25C18.3809 5.25 20.75 7.3293 20.75 10.0298C20.75 11.8797 19.9611 13.5064 18.8682 14.8815C17.7771 16.2543 16.35 17.4193 14.9835 18.366C14.4615 18.7276 13.9335 19.0611 13.4503 19.3072C12.9965 19.5383 12.4747 19.75 12 19.75C11.5253 19.75 11.0035 19.5383 10.5497 19.3072C10.0665 19.0611 9.53846 18.7276 9.01653 18.366C7.65005 17.4193 6.22287 16.2543 5.13182 14.8815C4.03888 13.5064 3.25 11.8797 3.25 10.0298ZM8.4 6.75C6.32075 6.75 4.75 8.2791 4.75 10.0298C4.75 11.4333 5.34579 12.74 6.30609 13.9482C7.26828 15.1588 8.56292 16.2269 9.87074 17.133C10.3656 17.4758 10.8317 17.7675 11.2305 17.9706C11.6586 18.1886 11.9067 18.25 12 18.25C12.0933 18.25 12.3414 18.1886 12.7695 17.9706C13.1683 17.7675 13.6344 17.4758 14.1293 17.133C15.4371 16.2269 16.7317 15.1588 17.6939 13.9482C18.6542 12.74 19.25 11.4333 19.25 10.0298C19.25 8.2791 17.6792 6.75 15.6 6.75C14.4058 6.75 13.2908 7.46342 12.5946 8.36892C12.4526 8.55356 12.2329 8.66176 12 8.66176C11.7671 8.66176 11.5474 8.55356 11.4054 8.36892C10.7092 7.46342 9.59415 6.75 8.4 6.75Z" fill="black" />
                                </svg>
                            </div>
                            <img src={product.thumbnail} alt="" className="product_thumbnail" />
                            <div className="product_details">
                                <h4 className="product_title">{product.name}</h4>
                                <p className="product_desc">{product.desc}</p>
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
