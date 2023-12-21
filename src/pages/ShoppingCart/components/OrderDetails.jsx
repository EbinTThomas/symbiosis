import React from 'react'
import { Link } from 'react-router-dom';

function OrderDetails({ cartList, btn_label }) {
    const totalCartPrice = cartList.reduce((total, item) => total + item.product.price, 0);
    // const convenienceFee = 27 + 19;
    const totalAmount = totalCartPrice;

    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
    };

    return (
        <div className="order_details_container">
            <div className="order_details_card">
                <div className="order_details_title">Order Details</div>
                <div className="order_sum">Cart Total<span>{formatPrice(totalCartPrice)}</span></div>
                <span className="convenience_fee_label">Convenience Fee</span>
                <ul className="convenience_fee">
                    <li>Delivery Fee<span>{formatPrice(0)}</span></li>
                    {/* <li>Fulfillment Fee<span>{formatPrice(19)}</span></li> */}
                </ul>
                <div className="order_total">Total Amount <span>{formatPrice(totalAmount)}</span></div>
                <div className="place_order_btn_container">
                    <div className="amount">{formatPrice(totalAmount)}</div>
                    <Link
                        to="/shopping_cart/delivery_details"
                        className={`btn_place_order ${cartList.length > 0 ? '' : 'disabled_link'}`}
                        onClick={(e) => (cartList.length === 0 && e.preventDefault())}
                    >
                        {btn_label}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z"
                                fill="black"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails