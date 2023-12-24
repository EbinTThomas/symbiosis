import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import { Link } from 'react-router-dom'
import '../../static/styles/Orders.css'
import axios from '../../api/axios'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import Loading from '../Common/Loading'
import Empty from '../Common/Empty'
import Footer from '../Common/Footer'
import StarRating from '../Shop/components/StarRating'

const ORDERS_URL = '/api/order/orders/'

function Orders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                ORDERS_URL,
                {
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            )
            setOrders(response.data);
        }
        catch (error) {
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleString('en-US', options);
        return formattedDate;
    };
    
    const formatIndianRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <Header />
            <BackButton />
            <PageTitle title={'My Orders'} />
            {
                !isLoading
                    ? (
                        orders.length > 0
                            ? (
                                <section className="section_content section_orders_page">
                                    {
                                        orders.map(order_product => (
                                            <div className="order_container" key={order_product.id}>
                                                <Link to={`/order_detail/${order_product.id}`} className="desktop_order_product">
                                                    <div className="order_product_details">
                                                        <img src={order_product.product.get_image ? order_product.product.get_image : '/assets/img/temp.jpg'} className="order_product_thumb" alt="" />
                                                        <div className="order_product_name">{order_product.product.name}</div>
                                                    </div>
                                                    <div className="order_price_details">
                                                        <div className="order_price">{formatIndianRupee(order_product.product.price)}</div>
                                                    </div>
                                                    <div className="order_status_details">
                                                        <div className="order_status">
                                                            <span className={`order_status_theme ${order_product.status === 'DELIVERED' ? 'success' : order_product.status === 'RETURN_REQUESTED' || order_product.status === 'ORDERED' ? 'warning' : order_product.status === 'CANCELLED' || order_product.status === 'RETURNED' ? 'danger' : ''}`}></span>
                                                            {
                                                                order_product.status === 'ORDERED' ? 'Order placed'
                                                                    : order_product.status === 'DELIVERED' ? 'Delivered'
                                                                        : order_product.status === 'CANCELLED' ? 'Cancelled'
                                                                            : order_product.status === 'RETURN_REQUESTED' ? 'Return requested'
                                                                                : order_product.status === 'RETURNED' && 'Returned'
                                                            } on {formatDate(order_product.status_date)}
                                                        </div>
                                                        <div className="order_status_caption">
                                                            {
                                                                order_product.status === 'DELIVERED' ?
                                                                    'Your item has been delivered'
                                                                    : order_product.status === 'ORDERED'
                                                                        ? 'Your product is on its way'
                                                                        : order_product.status === 'RETURN_REQUESTED'
                                                                            ? 'Product pickup on its way'
                                                                            : order_product.status === 'RETURNED'
                                                                                ? 'Refunded successfully'
                                                                                : order_product.status === 'CANCELLED'
                                                                                && 'Order have been Cancelled'
                                                            }</div>
                                                        {
                                                            order_product.is_reviewed
                                                                ?
                                                                <div className="order_rating_details rated">
                                                                    <StarRating averageRating={order_product.product.get_average_rating.rating} />
                                                                </div>
                                                                : order_product.status === 'DELIVERED' && <Link to={`/order_review/${order_product.id}`} className="order_rating_details">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M12.8649 2.99628C12.4796 2.33213 11.5204 2.33213 11.1351 2.99628L8.42101 7.67359C8.23064 8.00168 7.90159 8.22557 7.52653 8.28222L2.44021 9.05044C1.58593 9.17947 1.28627 10.2581 1.95158 10.8093L5.74067 13.9485C6.09141 14.2391 6.25633 14.6975 6.17113 15.1449L5.17996 20.35C5.02327 21.1729 5.88706 21.8122 6.62821 21.4219L11.4176 18.9001C11.7821 18.7082 12.2178 18.7082 12.5824 18.9001L17.3718 21.4219C18.1129 21.8122 18.9767 21.1729 18.82 20.35L17.8289 15.1449C17.7437 14.6975 17.9086 14.2391 18.2593 13.9485L22.0484 10.8093C22.7137 10.2581 22.4141 9.17947 21.5598 9.05044L16.4735 8.28222C16.0984 8.22557 15.7694 8.00168 15.579 7.67359L12.8649 2.99628Z" fill="black" />
                                                                    </svg>
                                                                    Rate & Review Product
                                                                </Link>
                                                        }
                                                    </div>
                                                </Link>
                                                <Link to={`/order_detail/${order_product.id}`} className="mobile_order_product">
                                                    <img src={order_product.product.get_image ? order_product.product.get_image : '/assets/img/temp.jpg'} className="order_product_thumb" alt="" />
                                                    <div className="order_details">
                                                        <div className="order_status">
                                                            <span className={`order_status_theme ${order_product.status === 'DELIVERED' ? 'success' : order_product.status === 'RETURN_REQUESTED' || order_product.status === 'ORDERED' ? 'warning' : order_product.status === 'CANCELLED' || order_product.status === 'RETURNED' ? 'danger' : ''}`}></span>
                                                            {
                                                                order_product.status === 'ORDERED' ? 'Order placed'
                                                                    : order_product.status === 'DELIVERED' ? 'Delivered'
                                                                        : order_product.status === 'CANCELLED' ? 'Cancelled'
                                                                            : order_product.status === 'RETURN_REQUESTED' ? 'Return requested'
                                                                                : order_product.status === 'RETURNED' && 'Returned'
                                                            } on {formatDate(order_product.status_date)}
                                                        </div>
                                                        <div className="order_product_name">{order_product.product.name}</div>
                                                        <div className="order_rating_details">
                                                            {
                                                                order_product.is_reviewed
                                                                    ? <div className="order_rating_details rated">
                                                                        <StarRating averageRating={order_product.product.get_average_rating.rating} />
                                                                    </div>
                                                                    : order_product.status === 'DELIVERED' && <Link to={`/order_review/${order_product.id}`}>
                                                                        {[...Array(5)].map((_, index) => (
                                                                            <svg key={index} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M12.8649 2.99628C12.4796 2.33213 11.5204 2.33213 11.1351 2.99628L8.42101 7.67359C8.23064 8.00168 7.90159 8.22557 7.52653 8.28222L2.44021 9.05044C1.58593 9.17947 1.28627 10.2581 1.95158 10.8093L5.74067 13.9485C6.09141 14.2391 6.25633 14.6975 6.17113 15.1449L5.17996 20.35C5.02327 21.1729 5.88706 21.8122 6.62821 21.4219L11.4176 18.9001C11.7821 18.7082 12.2178 18.7082 12.5824 18.9001L17.3718 21.4219C18.1129 21.8122 18.9767 21.1729 18.82 20.35L17.8289 15.1449C17.7437 14.6975 17.9086 14.2391 18.2593 13.9485L22.0484 10.8093C22.7137 10.2581 22.4141 9.17947 21.5598 9.05044L16.4735 8.28222C16.0984 8.22557 15.7694 8.00168 15.579 7.67359L12.8649 2.99628Z" fill="black" />
                                                                            </svg>
                                                                        ))}
                                                                        <p>
                                                                            Rate this product now
                                                                        </p>
                                                                    </Link>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="order_nav_arrow">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.96967 7.46967C10.2626 7.17678 10.7374 7.17678 11.0303 7.46967L15.0303 11.4697C15.3232 11.7626 15.3232 12.2374 15.0303 12.5303L11.0303 16.5303C10.7374 16.8232 10.2626 16.8232 9.96967 16.5303C9.67678 16.2374 9.67678 15.7626 9.96967 15.4697L13.4393 12L9.96967 8.53033C9.67678 8.23744 9.67678 7.76256 9.96967 7.46967Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </section>
                            )
                            : <Empty message={'Nothing Ordered Yet!'} />
                    )
                    : <Loading />
            }
            <Footer />
        </>
    )
}

export default Orders