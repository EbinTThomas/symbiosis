import React, { useEffect, useState } from 'react';
import ShoppingCartItem from './CartList/ShoppingCartItem';
import OrderDetails from './OrderDetails';
import axios from '../../../api/axios';

function CartList({ handleNext, handleBack }) {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);

    const [cartList, setCartList] = useState([]);

    const fetchCartList = async () => {
        try {
            const response = await axios.get(`/api/shopping-carts/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setCartList(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
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

    return (
        <>
            <button className="back_btn" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="black" />
                </svg>
            </button>
            <section className="section_cart_container">
                <div className="cart_list">
                    {
                        cartList.map(cartItem => (
                            <ShoppingCartItem cartItem={cartItem} key={cartItem.id} />
                        ))
                    }
                </div>
                <OrderDetails cartList={cartList} handleNext={handleNext} btn_label={"Place Order"} />
            </section>
        </>
    );
}

export default CartList;
