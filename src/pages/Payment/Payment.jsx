import React from 'react'
import Header from '../Common/Header'
import { useLocation } from 'react-router-dom'
import PaymentCancelled from './components/PaymentCancelled'
import PaymentSuccess from './components/PaymentSuccess'

function Payment() {
    const location = useLocation()
    
    return (
        <>
            <Header />
            {
                location.pathname === '/payment/success'
                    ? <PaymentSuccess />
                    : location.pathname === '/payment/cancelled'
                        ? <PaymentCancelled />
                        : 'Not found'
            }
        </>
    )
}

export default Payment