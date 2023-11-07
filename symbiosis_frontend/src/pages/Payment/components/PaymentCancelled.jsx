import React from 'react'
import { Link } from 'react-router-dom'

function PaymentCancelled() {
    return (
        <section className="section_content payment_status">
            <div class="container">
                <div class="success-message">
                    <h1>Payment Failed!</h1>
                    <p class="sub_title">Error with payment!</p>
                    <div class="wrapper">
                        <svg class="checkmark checkmark-cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle crossmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <path class="checkmark__check checkmark-cross" fill="none"
                                d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8" />
                        </svg>
                    </div>
                </div>
                <Link to="/shopping_cart" class="view-booking-button">Go back to Cart</Link>
            </div>
        </section>
    )
}

export default PaymentCancelled