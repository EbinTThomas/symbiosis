import React from 'react'
import '../../../static/styles/Payment.css'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
    return (
        <section className="section_content payment_status">
            <div className="container">
                <div className="success-message">
                    <h1>Payment Successful!</h1>
                    <p className="sub_title">Payment Reference ID: hi</p>
                    <div className="wrapper">
                        <svg className="checkmark checkmark-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                </div>
                <Link to="/orders" className="view-booking-button" href="{% url 'bookings' %}">View Orders</Link>
            </div>
        </section>
    )
}

export default PaymentSuccess