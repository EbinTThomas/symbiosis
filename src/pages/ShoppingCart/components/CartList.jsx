import React, { useEffect, useState } from 'react';
import ShoppingCartItem from './CartList/ShoppingCartItem';
import OrderDetails from './OrderDetails';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { useLayoutContext } from '../../Common/LayoutContext';

function CartList({ fetchCartList, cartList, setCartList, setCartCount, cartCount }) {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCartList();
    }, [])

    // Calculate the sum of prices and convenience fees
    const totalCartPrice = cartList.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const convenienceFee = 27 + 19; // Example values, adjust as needed
    const totalAmount = totalCartPrice + convenienceFee;

    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
    };

    const removeCartItem = async (product) => {
        try {
            const response = await axios.delete(`/api/cart-products/${product.id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            });
            // Remove the product from the wishList and update wishListProductIds
            setCartList(cartList.filter((item) => item.product.id !== product.id));
            setCartCount(cartCount - 1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="section_cart_container">
                <div className="cart_list">
                    {cartList.length > 0
                        ? cartList.map(cartItem => (
                            <ShoppingCartItem fetchCartList={fetchCartList} cartItem={cartItem} removeCartItem={removeCartItem} key={cartItem.id} />
                        ))
                        : <div className="empty_definition">
                            <svg className="empty_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z" /></svg>
                            <br/><span>Nothing in Cart!</span>
                        </div>
                    }
                </div>
                <OrderDetails cartList={cartList} btn_label={"Place Order"} />
            </section>
        </>
    );
}

export default CartList;
