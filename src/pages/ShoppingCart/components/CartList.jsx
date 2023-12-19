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
                            <span>Nothing in Cart!</span><br/>
                            <Link to="/shop" className="grab_some_btn">Grab Some</Link>
                        </div>
                    }
                </div>
                <OrderDetails cartList={cartList} btn_label={"Place Order"} />
            </section>
        </>
    );
}

export default CartList;
