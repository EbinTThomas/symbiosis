import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useLayoutContext } from '../../Common/LayoutContext';
import axios from '../../../api/axios';

function SectionProductDetail({ productDetail }) {
    const [wishListed, setWishListed] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { setCartCount } = useLayoutContext();
    const [isInCart, setIsInCart] = useState(false)
    const isAuthenticated = useState(localStorage.getItem('isAuthenticated'));
    const token = localStorage.getItem('token');

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(
                '/api/cart-products/', {
                data: {
                    product_id: productDetail.id,
                    quantity: 2
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            }
            )
            console.log(response.data)
            setIsInCart(true);
            setCartCount(cartCount+1);
        } catch (error) {
            console.log(error);
        }
    }

    const checkWishlist = async () => {
        try {
            const response = await axios.get('/api/wishlist/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            });
            let wishlist_products = response.data.products;
            if (wishlist_products.some(item => item.id === productDetail.id)) {
                setWishListed(true);
            } else {
                setWishListed(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Function to handle incrementing the quantity
    const handleIncrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Function to handle decrementing the quantity, ensuring it never goes below 1
    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        checkWishlist();
    }, [productDetail]);

    return (
        <div className="product_details_container">
            <div className="img_slider_container">
                <div className={`add_to_wishlist_btn ${wishListed ? "active" : null}`}>
                    {
                        wishListed
                            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.4 5.25C5.61914 5.25 3.25 7.3293 3.25 10.0298C3.25 11.8927 4.12235 13.4612 5.27849 14.7604C6.43066 16.0552 7.91714 17.142 9.26097 18.0516L11.5796 19.6211C11.8335 19.793 12.1665 19.793 12.4204 19.6211L14.739 18.0516C16.0829 17.142 17.5693 16.0552 18.7215 14.7604C19.8777 13.4612 20.75 11.8927 20.75 10.0298C20.75 7.3293 18.3809 5.25 15.6 5.25C14.1665 5.25 12.9052 5.92214 12 6.79183C11.0948 5.92214 9.83347 5.25 8.4 5.25Z" fill="black" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.25 10.0298C3.25 7.3293 5.61914 5.25 8.4 5.25C9.83347 5.25 11.0948 5.92214 12 6.79183C12.9052 5.92214 14.1665 5.25 15.6 5.25C18.3809 5.25 20.75 7.3293 20.75 10.0298C20.75 11.8797 19.9611 13.5064 18.8682 14.8815C17.7771 16.2543 16.35 17.4193 14.9835 18.366C14.4615 18.7276 13.9335 19.0611 13.4503 19.3072C12.9965 19.5383 12.4747 19.75 12 19.75C11.5253 19.75 11.0035 19.5383 10.5497 19.3072C10.0665 19.0611 9.53846 18.7276 9.01653 18.366C7.65005 17.4193 6.22287 16.2543 5.13182 14.8815C4.03888 13.5064 3.25 11.8797 3.25 10.0298ZM8.4 6.75C6.32075 6.75 4.75 8.2791 4.75 10.0298C4.75 11.4333 5.34579 12.74 6.30609 13.9482C7.26828 15.1588 8.56292 16.2269 9.87074 17.133C10.3656 17.4758 10.8317 17.7675 11.2305 17.9706C11.6586 18.1886 11.9067 18.25 12 18.25C12.0933 18.25 12.3414 18.1886 12.7695 17.9706C13.1683 17.7675 13.6344 17.4758 14.1293 17.133C15.4371 16.2269 16.7317 15.1588 17.6939 13.9482C18.6542 12.74 19.25 11.4333 19.25 10.0298C19.25 8.2791 17.6792 6.75 15.6 6.75C14.4058 6.75 13.2908 7.46342 12.5946 8.36892C12.4526 8.55356 12.2329 8.66176 12 8.66176C11.7671 8.66176 11.5474 8.55356 11.4054 8.36892C10.7092 7.46342 9.59415 6.75 8.4 6.75Z" fill="black" />
                            </svg>
                    }
                </div>
                <img src={productDetail.image} alt="" className="product_thumbnail" />
            </div>
            <div className="product_details">
                <h3 className="product_name">{productDetail.name}</h3>
                <p className="product_desc">{productDetail.description}</p>
                <div className="flex_box">
                    <h4 className="product_price">₹{productDetail.price} {productDetail.unit}</h4>
                    <div className="q_selector_container">
                        <div className="q_tag">Quantity</div>
                        <button className="q_btn" id="q_dec_btn" onClick={handleDecrementQuantity}>-</button>
                        <input type="number" className="q_input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <button className="q_btn" id="q_inc_btn" onClick={handleIncrementQuantity}>+</button>
                    </div>
                </div>
                <div className="action_btn_container">
                    <Link to="/shopping-cart" className="buy_now_btn">
                        Buy Now
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z" fill="black" />
                        </svg>
                    </Link>
                    {
                        isAuthenticated
                            ? <button onClick={handleAddToCart} className="add_to_cart_btn" disabled={isInCart && true}>
                                {
                                    isInCart
                                        ? <>
                                            View in Cart
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <path d="M19.1477 5.25H5.33514L4.15497 3.1346C4.0225 2.89715 3.7719 2.75 3.5 2.75H2C1.58579 2.75 1.25 3.08579 1.25 3.5C1.25 3.91421 1.58579 4.25 2 4.25H3.0596L4.22429 6.33765L6.91037 12.2809L6.91312 12.2869L7.14971 12.8104L4.45287 15.687C4.25895 15.8939 4.19825 16.1924 4.29599 16.4585C4.39372 16.7247 4.63317 16.913 4.91486 16.9452L7.37299 17.2261C10.4477 17.5775 13.5524 17.5775 16.627 17.2261L19.0852 16.9452C19.4967 16.8981 19.7922 16.5264 19.7452 16.1148C19.6981 15.7033 19.3264 15.4078 18.9149 15.4549L16.4567 15.7358C13.4952 16.0742 10.5048 16.0742 7.54331 15.7358L6.56779 15.6243L8.54717 13.513C8.56632 13.4925 8.5841 13.4713 8.60052 13.4494L9.35334 13.5474C10.4083 13.6847 11.4746 13.7116 12.5351 13.6277C15.0086 13.4321 17.301 12.2551 18.9015 10.3591L19.4795 9.67425C19.499 9.65125 19.517 9.62711 19.5335 9.60194L20.6109 7.96009C21.3745 6.79633 20.5397 5.25 19.1477 5.25Z" fill="black" />
                                                <path d="M6.5 18.5C5.67157 18.5 5 19.1716 5 20C5 20.8284 5.67157 21.5 6.5 21.5C7.32843 21.5 8 20.8284 8 20C8 19.1716 7.32843 18.5 6.5 18.5Z" fill="black" />
                                                <path d="M16 20C16 19.1716 16.6716 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5C16.6716 21.5 16 20.8284 16 20Z" fill="black" />
                                            </svg>
                                        </>
                                        : <>
                                            Add to Cart
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M19.1477 5.25H5.33514L4.15497 3.1346C4.0225 2.89715 3.7719 2.75 3.5 2.75H2C1.58579 2.75 1.25 3.08579 1.25 3.5C1.25 3.91421 1.58579 4.25 2 4.25H3.0596L4.22429 6.33765L6.91037 12.2809L6.91312 12.2869L7.14971 12.8104L4.45287 15.687C4.25895 15.8939 4.19825 16.1924 4.29599 16.4585C4.39372 16.7247 4.63317 16.913 4.91486 16.9452L7.37299 17.2261C10.4477 17.5775 13.5524 17.5775 16.627 17.2261L19.0852 16.9452C19.4967 16.8981 19.7922 16.5264 19.7452 16.1148C19.6981 15.7033 19.3264 15.4078 18.9149 15.4549L16.4567 15.7358C13.4952 16.0742 10.5048 16.0742 7.54331 15.7358L6.56779 15.6243L8.54717 13.513C8.56632 13.4925 8.5841 13.4713 8.60052 13.4494L9.35334 13.5474C10.4083 13.6847 11.4746 13.7116 12.5351 13.6277C15.0086 13.4321 17.301 12.2551 18.9015 10.3591L19.4795 9.67425C19.499 9.65125 19.517 9.62711 19.5335 9.60194L20.6109 7.96009C21.3745 6.79633 20.5397 5.25 19.1477 5.25ZM8.65627 11.944C8.49086 11.9225 8.34823 11.8175 8.27858 11.666L8.27725 11.6631L6.05674 6.75H19.1477C19.3466 6.75 19.4658 6.9709 19.3567 7.13716L18.3042 8.74123L17.7552 9.39152C16.4132 10.9814 14.4909 11.9683 12.4169 12.1324C11.4603 12.208 10.4984 12.1837 9.54688 12.0599L8.65627 11.944Z" fill="black" />
                                                <path d="M6.5 18.5C5.67157 18.5 5 19.1716 5 20C5 20.8284 5.67157 21.5 6.5 21.5C7.32843 21.5 8 20.8284 8 20C8 19.1716 7.32843 18.5 6.5 18.5Z" fill="black" />
                                                <path d="M16 20C16 19.1716 16.6716 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5C16.6716 21.5 16 20.8284 16 20Z" fill="black" />
                                            </svg>
                                        </>
                                }
                            </button>
                            : <Link to="/login" className="add_to_cart_btn">
                                Add to Cart
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.1477 5.25H5.33514L4.15497 3.1346C4.0225 2.89715 3.7719 2.75 3.5 2.75H2C1.58579 2.75 1.25 3.08579 1.25 3.5C1.25 3.91421 1.58579 4.25 2 4.25H3.0596L4.22429 6.33765L6.91037 12.2809L6.91312 12.2869L7.14971 12.8104L4.45287 15.687C4.25895 15.8939 4.19825 16.1924 4.29599 16.4585C4.39372 16.7247 4.63317 16.913 4.91486 16.9452L7.37299 17.2261C10.4477 17.5775 13.5524 17.5775 16.627 17.2261L19.0852 16.9452C19.4967 16.8981 19.7922 16.5264 19.7452 16.1148C19.6981 15.7033 19.3264 15.4078 18.9149 15.4549L16.4567 15.7358C13.4952 16.0742 10.5048 16.0742 7.54331 15.7358L6.56779 15.6243L8.54717 13.513C8.56632 13.4925 8.5841 13.4713 8.60052 13.4494L9.35334 13.5474C10.4083 13.6847 11.4746 13.7116 12.5351 13.6277C15.0086 13.4321 17.301 12.2551 18.9015 10.3591L19.4795 9.67425C19.499 9.65125 19.517 9.62711 19.5335 9.60194L20.6109 7.96009C21.3745 6.79633 20.5397 5.25 19.1477 5.25ZM8.65627 11.944C8.49086 11.9225 8.34823 11.8175 8.27858 11.666L8.27725 11.6631L6.05674 6.75H19.1477C19.3466 6.75 19.4658 6.9709 19.3567 7.13716L18.3042 8.74123L17.7552 9.39152C16.4132 10.9814 14.4909 11.9683 12.4169 12.1324C11.4603 12.208 10.4984 12.1837 9.54688 12.0599L8.65627 11.944Z" fill="black" />
                                    <path d="M6.5 18.5C5.67157 18.5 5 19.1716 5 20C5 20.8284 5.67157 21.5 6.5 21.5C7.32843 21.5 8 20.8284 8 20C8 19.1716 7.32843 18.5 6.5 18.5Z" fill="black" />
                                    <path d="M16 20C16 19.1716 16.6716 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5C16.6716 21.5 16 20.8284 16 20Z" fill="black" />
                                </svg>
                            </Link>
                    }
                </div>
            </div >
        </div >
    )
}

export default SectionProductDetail