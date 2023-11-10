import React from 'react'
import Header from '../Common/Header'
import '../../static/styles/ShoppingCart.css';
import CartList from './components/CartList';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryDetails from './components/DeliveryDetails';

function ShoppingCart() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate(-1, { replace: true })
    }
    return (
        <section className="section_content">
            <Header />
            {location.pathname === '/shopping_cart'
                ? <CartList handleBack={handleBack} />
                : location.pathname === '/shopping_cart/delivery_details'
                    ? <DeliveryDetails handleBack={handleBack} />
                    : <></>
            }
        </section>
    )
}

export default ShoppingCart