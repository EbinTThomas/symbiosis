import React, { useState } from 'react'
import Header from '../Common/Header'
import '../../static/styles/ShoppingCart.css';
import CartList from './components/CartList';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveryDetails from './components/DeliveryDetails';
import axios from '../../api/axios';
import { useLayoutContext } from '../Common/LayoutContext';
import BackButton from '../Common/BackButton';
import PageTitle from '../Common/PageTitle';

function ShoppingCart() {
    const location = useLocation();
    const [cartList, setCartList] = useState([]);
    const token = localStorage.getItem('token');
    const { cartCount, setCartCount } = useLayoutContext();
    const [isLoading, setIsLoading] = useState(true);

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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Header />
            <BackButton />
            <PageTitle title={'Shopping Cart'} />
            <section className="section_content section_shopping_cart">
                {location.pathname === '/shopping_cart'
                    ? <CartList fetchCartList={fetchCartList} isLoading={isLoading} cartList={cartList} setCartList={setCartList} setCartCount={setCartCount} cartCount={cartCount} />
                    : location.pathname === '/shopping_cart/delivery_details'
                        ? <DeliveryDetails fetchCartList={fetchCartList} cartList={cartList} />
                        : <></>
                }
            </section>
            <Footer />
        </>
    )
}

export default ShoppingCart