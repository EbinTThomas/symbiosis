import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../api/axios';
import StarRating from '../../Shop/components/StarRating';

function SectionProductList({ products, removeFromWishlist }) {
    const token = localStorage.getItem('token');

    const formatIndianRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleAddToCart = async (product_id) => {
        try {
            const response = await axios.post(
                '/api/cart-products/',
                {
                    product_id: product_id,
                    quantity: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                }
            )
            removeFromWishlist(product_id);
        } catch (error) {
        }
    }

    return (
        <section id="section_product_list">
            {products.map(product => (
                <div className="product_wrap" key={product.id}>
                    <Link to={`/product_detail/${product.id}`} className="product_card" key={product.id}>
                        <img src={product.get_image ? product.get_image : '/assets/img/temp.jpg'} alt="" className="product_thumbnail" />
                        <div className="product_details">
                            <h4 className="product_title">{product.name}</h4>
                            <div className="product_rating">
                                <StarRating averageRating={product.get_average_rating.rating} />
                                <span>({product.get_average_rating.count})</span>
                            </div>
                            <div className="product_price">
                                {
                                    product.discount > 0
                                    && <>
                                        <span className="off_percent">-{product.discount}%</span>
                                        <span className="product_org_price">{formatIndianRupee(product.mrp)}</span>
                                    </>
                                }{formatIndianRupee(product.price)}
                            </div>
                        </div>
                    </Link>
                    <div className="btn_class">
                        <button className="rm_wishlist_btn" onClick={() => removeFromWishlist(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z" fill="black" />
                                <path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z" fill="black" />
                                <path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z" fill="black" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z" fill="black" />
                            </svg>
                        </button>
                        <button className="add_to_cart_btn" onClick={() => handleAddToCart(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.1477 5.25H5.33514L4.15497 3.1346C4.0225 2.89715 3.7719 2.75 3.5 2.75H2C1.58579 2.75 1.25 3.08579 1.25 3.5C1.25 3.91421 1.58579 4.25 2 4.25H3.0596L4.22429 6.33765L6.91037 12.2809L6.91312 12.2869L7.14971 12.8104L4.45287 15.687C4.25895 15.8939 4.19825 16.1924 4.29599 16.4585C4.39372 16.7247 4.63317 16.913 4.91486 16.9452L7.37299 17.2261C10.4477 17.5775 13.5524 17.5775 16.627 17.2261L19.0852 16.9452C19.4967 16.8981 19.7922 16.5264 19.7452 16.1148C19.6981 15.7033 19.3264 15.4078 18.9149 15.4549L16.4567 15.7358C13.4952 16.0742 10.5048 16.0742 7.54331 15.7358L6.56779 15.6243L8.54717 13.513C8.56632 13.4925 8.5841 13.4713 8.60052 13.4494L9.35334 13.5474C10.4083 13.6847 11.4746 13.7116 12.5351 13.6277C15.0086 13.4321 17.301 12.2551 18.9015 10.3591L19.4795 9.67425C19.499 9.65125 19.517 9.62711 19.5335 9.60194L20.6109 7.96009C21.3745 6.79633 20.5397 5.25 19.1477 5.25ZM8.65627 11.944C8.49086 11.9225 8.34823 11.8175 8.27858 11.666L8.27725 11.6631L6.05674 6.75H19.1477C19.3466 6.75 19.4658 6.9709 19.3567 7.13716L18.3042 8.74123L17.7552 9.39152C16.4132 10.9814 14.4909 11.9683 12.4169 12.1324C11.4603 12.208 10.4984 12.1837 9.54688 12.0599L8.65627 11.944Z" fill="black" />
                                <path d="M6.5 18.5C5.67157 18.5 5 19.1716 5 20C5 20.8284 5.67157 21.5 6.5 21.5C7.32843 21.5 8 20.8284 8 20C8 19.1716 7.32843 18.5 6.5 18.5Z" fill="black" />
                                <path d="M16 20C16 19.1716 16.6716 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5C16.6716 21.5 16 20.8284 16 20Z" fill="black" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div >
            ))
            }
        </section >
    )
}

export default SectionProductList