import React, { useEffect, useState } from 'react';
import AddressForm from './DeliveryDetails/AddressForm';
import OrderDetails from './OrderDetails';
import axios from '../../../api/axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function DeliveryDetails({ handleBack, fetchCartList, cartList }) {
    const [addressForm, setAddressForm] = useState(false);
    const [addressFilled, setAddressFilled] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState({});
    const token = localStorage.getItem('token');
    const [sessionID, setSessionID] = useState('');

    const fetchDeliveryAddress = async () => {
        try {
            const response = await axios.get(`/api/address/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setDeliveryAddress(response.data);
            if (response.data.user !== null) {
                setAddressFilled(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCartList();
        fetchDeliveryAddress();
    }, [])

    const handleToggleForm = () => {
        setAddressForm(addressForm ? false : true);
        fetchDeliveryAddress();
    }

    const totalCartPrice = cartList.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const convenienceFee = 27 + 19; // Example values, adjust as needed
    const totalAmount = totalCartPrice + convenienceFee;

    const formatPrice = (price) => {
        return price.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
    };

    const handleProceedPayment = async () => {
        try {
            // Get Stripe configuration
            const stripeConfigResponse = await axios.get('/api/payment/stripe/config/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                }
            });

            const stripePublicKey = stripeConfigResponse.data.publicKey;

            // Initialize Stripe with the public key
            const stripePromise = loadStripe(stripePublicKey);
            const stripe = await stripePromise;

            // Create a checkout session
            const response = await axios.get('/api/payment/stripe/create-checkout-session/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });

            const sessionId = response.data.sessionId;

            if (sessionId) {
                // Use Stripe to redirect to the Stripe payment portal
                const { error } = await stripe.redirectToCheckout({
                    sessionId: sessionId,
                });

                if (error) {
                    console.log(`Error redirecting to checkout: ${error.message}`);
                }
            } else {
                console.log('No session ID received from the server.');
            }
        } catch (error) {
            console.log(`Error creating checkout session: ${error}`);
        }
    }


    return (
        <>
            <button className="back_btn" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="black" />
                </svg>
            </button>
            <section className="section_delivery_details">
                <div className="delivery_address_wrap">
                    <div className="delivery_address_top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25003 10C7.25003 7.37665 9.37667 5.25 12 5.25C14.6234 5.25 16.75 7.37665 16.75 10C16.75 12.6234 14.6234 14.75 12 14.75C9.37667 14.75 7.25003 12.6234 7.25003 10ZM12 6.75C10.2051 6.75 8.75003 8.20507 8.75003 10C8.75003 11.7949 10.2051 13.25 12 13.25C13.795 13.25 15.25 11.7949 15.25 10C15.25 8.20507 13.795 6.75 12 6.75Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52439 8.85685C3.87872 4.55824 7.47087 1.25 11.7841 1.25H12.216C16.5292 1.25 20.1213 4.55824 20.4757 8.85685C20.666 11.166 19.9527 13.4589 18.4861 15.2526L13.693 21.1144C12.818 22.1845 11.1821 22.1845 10.307 21.1144L5.51399 15.2526C4.04733 13.4589 3.33405 11.166 3.52439 8.85685ZM11.7841 2.75C8.25152 2.75 5.30952 5.45948 5.01932 8.98008C4.8609 10.9019 5.45455 12.8102 6.67521 14.3031L11.4683 20.1649C11.7431 20.501 12.2569 20.501 12.5318 20.1649L17.3248 14.3031C18.5455 12.8102 19.1391 10.9019 18.9807 8.98008C18.6905 5.45948 15.7485 2.75 12.216 2.75H11.7841Z" fill="black" />
                        </svg>
                        <div className="delivery_address_title"><span>Delivery Address</span><p>We will deliver your order to this address</p></div>
                    </div>
                    <div className="delivery_address_content">
                        {addressFilled ? <>
                            <div className="username">{deliveryAddress.full_name}</div>
                            <p className="address">
                                {deliveryAddress.building}, {deliveryAddress.locality}<br />
                                {deliveryAddress.landmark},<br />
                                {deliveryAddress.city}, {deliveryAddress.state}<br />
                                {deliveryAddress.pincode}<br />
                                Phone : {deliveryAddress.phone}
                            </p>
                        </>
                            : <>
                                <div className="empty_class">
                                    {
                                        !addressFilled &&
                                        <button className="toggle_address_btn add" onClick={handleToggleForm}>
                                            Add Address
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4549 5.41575C21.6471 5.70687 21.615 6.10248 21.3588 6.35876L12.1664 15.5511C12.0721 15.6454 11.9545 15.7128 11.8256 15.7465L7.99716 16.7465C7.87229 16.7791 7.74358 16.7784 7.62265 16.7476C7.49408 16.7149 7.37431 16.6482 7.27729 16.5511C7.08902 16.3629 7.01468 16.0889 7.08197 15.8313L8.08197 12.0028C8.11144 11.89 8.16673 11.7786 8.24322 11.6912L17.4697 2.46967C17.5504 2.38891 17.6477 2.32846 17.7536 2.29163C17.8321 2.26432 17.9153 2.25 18 2.25C18.1989 2.25 18.3897 2.32902 18.5303 2.46967L21.3588 5.2981C21.3954 5.33471 21.4274 5.37416 21.4549 5.41575ZM19.7678 5.82843L18 4.06066L9.48184 12.5788L8.85685 14.9716L11.2496 14.3466L19.7678 5.82843Z" fill="black" />
                                                <path d="M19.6414 17.1603C19.9148 14.8227 20.0018 12.4688 19.9023 10.1208C19.8976 10.0084 19.9399 9.89898 20.0194 9.81942L21.0027 8.83609C21.1236 8.71519 21.3302 8.79194 21.3415 8.96254C21.5265 11.7522 21.4564 14.5545 21.1312 17.3346C20.8946 19.3571 19.2703 20.9421 17.2583 21.167C13.7917 21.5544 10.2083 21.5544 6.74177 21.167C4.72971 20.9421 3.10538 19.3571 2.86883 17.3346C2.45429 13.7903 2.45429 10.2097 2.86883 6.66543C3.10538 4.6429 4.72971 3.05789 6.74177 2.83301C9.37152 2.5391 12.0685 2.46815 14.7306 2.62016C14.9022 2.62996 14.9804 2.83757 14.8589 2.95909L13.8664 3.95165C13.7877 4.03034 13.6798 4.07261 13.5685 4.06885C11.3421 3.99376 9.10055 4.07872 6.90838 4.32373C5.57827 4.47239 4.51278 5.522 4.35867 6.83968C3.95767 10.2682 3.95767 13.7318 4.35867 17.1603C4.51278 18.478 5.57827 19.5276 6.90838 19.6763C10.2642 20.0513 13.7358 20.0513 17.0916 19.6763C18.4218 19.5276 19.4872 18.478 19.6414 17.1603Z" fill="black" />
                                            </svg>
                                        </button>
                                    }
                                </div>

                            </>
                        }
                        {
                            addressFilled &&
                            <button className="toggle_address_btn" onClick={handleToggleForm}>
                                Change Address
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4549 5.41575C21.6471 5.70687 21.615 6.10248 21.3588 6.35876L12.1664 15.5511C12.0721 15.6454 11.9545 15.7128 11.8256 15.7465L7.99716 16.7465C7.87229 16.7791 7.74358 16.7784 7.62265 16.7476C7.49408 16.7149 7.37431 16.6482 7.27729 16.5511C7.08902 16.3629 7.01468 16.0889 7.08197 15.8313L8.08197 12.0028C8.11144 11.89 8.16673 11.7786 8.24322 11.6912L17.4697 2.46967C17.5504 2.38891 17.6477 2.32846 17.7536 2.29163C17.8321 2.26432 17.9153 2.25 18 2.25C18.1989 2.25 18.3897 2.32902 18.5303 2.46967L21.3588 5.2981C21.3954 5.33471 21.4274 5.37416 21.4549 5.41575ZM19.7678 5.82843L18 4.06066L9.48184 12.5788L8.85685 14.9716L11.2496 14.3466L19.7678 5.82843Z" fill="black" />
                                    <path d="M19.6414 17.1603C19.9148 14.8227 20.0018 12.4688 19.9023 10.1208C19.8976 10.0084 19.9399 9.89898 20.0194 9.81942L21.0027 8.83609C21.1236 8.71519 21.3302 8.79194 21.3415 8.96254C21.5265 11.7522 21.4564 14.5545 21.1312 17.3346C20.8946 19.3571 19.2703 20.9421 17.2583 21.167C13.7917 21.5544 10.2083 21.5544 6.74177 21.167C4.72971 20.9421 3.10538 19.3571 2.86883 17.3346C2.45429 13.7903 2.45429 10.2097 2.86883 6.66543C3.10538 4.6429 4.72971 3.05789 6.74177 2.83301C9.37152 2.5391 12.0685 2.46815 14.7306 2.62016C14.9022 2.62996 14.9804 2.83757 14.8589 2.95909L13.8664 3.95165C13.7877 4.03034 13.6798 4.07261 13.5685 4.06885C11.3421 3.99376 9.10055 4.07872 6.90838 4.32373C5.57827 4.47239 4.51278 5.522 4.35867 6.83968C3.95767 10.2682 3.95767 13.7318 4.35867 17.1603C4.51278 18.478 5.57827 19.5276 6.90838 19.6763C10.2642 20.0513 13.7358 20.0513 17.0916 19.6763C18.4218 19.5276 19.4872 18.478 19.6414 17.1603Z" fill="black" />
                                </svg>
                            </button>
                        }
                    </div>
                </div>
                <div className="order_details_container">
                    <div className="order_details_card">
                        <div className="order_details_title">Order Details</div>
                        <div className="order_sum">Cart Total<span>{formatPrice(totalCartPrice)}</span></div>
                        <span className="convenience_fee_label">Convenience Fee</span>
                        <ul className="convenience_fee">
                            <li>Delivery Fee<span>{formatPrice(27)}</span></li>
                            <li>Fulfillment Fee<span>{formatPrice(19)}</span></li>
                        </ul>
                        <div className="order_total">Total Amount <span>{formatPrice(totalAmount)}</span></div>
                        <div className="place_order_btn_container">
                            <div className="amount">{formatPrice(totalAmount)}</div>
                            <button
                                onClick={handleProceedPayment}
                                className={`btn_place_order ${!addressFilled ? 'disabled_link' : ''}`}
                            >
                                Proceed To Payment
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z" fill="black" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {addressForm && <AddressForm handleToggleForm={handleToggleForm} />}
            </section >
        </>
    )
}

export default DeliveryDetails