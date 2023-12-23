import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import { useParams } from 'react-router-dom'
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
            console.log(response.data)
            setOrder(response.data);
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchOrderDetail();
    }, [order_id])

    return (
        <>
            <Header />
            <BackButton />
            <PageTitle title={'Order Detail'} />
            {
                isLoading
                    ? <Loading />
                    : <section className="section_order_detail section_content">
                        <div className="order_id">{order.id}</div>
                        <div className="order_details_container">
                            <div className="order_details">
                                <div className="order_product_name">
                                    {order.product.name}
                                </div>
                                <div className="order_product_brand">
                                    {order.product.brand.name}
                                </div>
                                <div className="order_product_price">
                                    {order.product.price} x <span className="order_quantity">
                                        {order.quantity}
                                    </span>
                                </div>
                            </div>
                            <img src={order.product.get_image} alt="" />
                        </div>
                        <div className="order_total_price">
                            <span>Total: </span>{order.total_price}
                        </div>
                        <div className="order_track_container">
                            <div className="order_track_item">
                                <div className="order_circle"></div>
                                <div className="order_track_status">Order Confirmed, Apr 16, 2021</div>
                            </div>
                            <div className="order_track_item">
                                <div className="order_circle"></div>
                                <div className="order_track_status">Delivered, Apr 21, 2021</div>
                            </div>
                        </div>
                    </section>
            }
            <Footer />
        </>
    )
}

export default OrderDetail
