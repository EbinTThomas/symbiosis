import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Common/Loading'
import axios from '../../api/axios'
import '../../static/styles/OrderDetail.css'

function OrderDetail() {
    const { order_id } = useParams();
    const ORDER_DETAIL_URL = `/api/order/orders/${order_id}/`;
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchOrderDetail = async () => {
        try {
            const response = await axios.get(
                ORDER_DETAIL_URL,
                {
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            )
            setOrder(response.data);
        }
        catch (error) {
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchOrderDetail();
    }, [order_id])

    const formatIndianRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleString('en-US', options);
        return formattedDate;
    };

    return (
        <>
            <Header />
            <BackButton />
            <PageTitle title={'Order Detail'} />
            {
                isLoading
                    ? <Loading />
                    : <section className="section_order_detail section_content">
                        <div className="order_id">Order ID: {order.id}</div>
                        <Link to={`/product_detail/${order.product.id}`} className="order_details_container">
                            <div className="order_details">
                                <div className="order_product_name">
                                    {order.product.name}
                                </div>
                                <div className="order_product_brand">
                                    {order.product.brand.name}
                                </div>
                                <div className="order_product_price">
                                    {formatIndianRupee(order.product.price)} <span className="order_quantity">
                                        x {order.quantity}
                                    </span>
                                </div>
                            </div>
                            <img src={order.product.get_image} alt="" />
                        </Link>
                        <div className="order_total_price">
                            <span>Total: </span>{formatIndianRupee(order.total_price)}
                        </div>
                        <div className="order_track_container">
                            <div className="order_track_item">
                                <span className="order_status_theme success"></span>
                                <div className="order_track_status">Order Confirmed, {formatDate(order.order_date)}</div>
                            </div>
                            <div className={`order_track_item ${order.status !== 'ORDERED' && 'success'}`}>
                                <span className={`order_status_theme ${order.status === 'DELIVERED' ? 'success' : order.status === 'RETURN_REQUESTED' || order.status === 'ORDERED' ? '' : order.status === 'CANCELLED' || order.status === 'RETURNED' ? 'danger' : ''}`}></span>
                                <div className="order_track_status">{
                                    order.status === 'ORDERED' ? 'Arriving soon'
                                        : order.status === 'DELIVERED' ? 'Delivered'
                                            : order.status === 'CANCELLED' ? 'Cancelled'
                                                : order.status === 'RETURN_REQUESTED' ? 'Return requested'
                                                    : order.status === 'RETURNED' && 'Returned'
                                }{order.status !== 'ORDERED' && ', '+formatDate(order.status_date)}</div>
                            </div>
                        </div>
                    </section>
            }
            <Footer />
        </>
    )
}

export default OrderDetail
