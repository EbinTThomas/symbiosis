import React, { useState } from 'react'
import Header from '../Common/Header'
import '../../static/styles/ShoppingCart.css';
import CartList from './components/CartList';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryDetails from './components/DeliveryDetails';
import axios from '../../api/axios';
import { useLayoutContext } from '../Common/LayoutContext';

function ShoppingCart() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartList, setCartList] = useState([]);
    const token = localStorage.getItem('token');
    const {cartCount, setCartCount} = useLayoutContext();

    const fetchCartList = async () => {
        try {
            const response = await axios.get(`/api/shopping-carts/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            setCartList(response.data);
            setCartCount(response.data.length);
        } catch (error) {
            console.log(error);
        }
    }

    const handleBack = () => {
        navigate(-1, { replace: true })
    }
    return (
        <section className="section_content">
            <Header />
            {location.pathname === '/shopping_cart'
                ? <CartList handleBack={handleBack} fetchCartList={fetchCartList} cartList={cartList} setCartList={setCartList} setCartCount={setCartCount} cartCount={cartCount} />
                : location.pathname === '/shopping_cart/delivery_details'
                    ? <DeliveryDetails handleBack={handleBack} fetchCartList={fetchCartList} cartList={cartList} />
                    : <></>
            }
        </section>
    )
}

export default ShoppingCart