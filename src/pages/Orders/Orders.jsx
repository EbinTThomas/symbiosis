import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import { Link } from 'react-router-dom'
import '../../static/styles/Orders.css'
import axios from '../../api/axios'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import Loading from '../Common/Loading'
import Empty from '../Common/Empty'

const ORDERS_URL = '/api/order/orders/'

function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
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
            setOrders(response.data.orders);
            setOrderProducts(response.data.order_products);
            console.log(response.data.orders)
            console.log(response.data.order_products)
        }
        catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchOrders();
    }, [])
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
                                <section className="section_content orders_page">
                                    {
                                        orders.map(order => (
                                            <div className="order_container" key={order.id}>
                                                {
                                                    orderProducts
                                                        .filter(order_product => order_product.order === order.id)
                                                        .map(order_product => (
                                                            <Link to={`/product_detail/${order_product.product.id}`} className="order_product" key={order_product.id}>
                                                                <img src={order_product.product.get_image ? order_product.product.get_image : '/assets/img/temp.jpg'} className="order_product_thumb" alt="" />
                                                                <div className="order_product_details">
                                                                    <div className="order_product_title">{order_product.product.name}</div>
                                                                    <p className="order_product_description">{order_product.product.description}</p>
                                                                    <div className="bottom_container">
                                                                        <div className="order_product_price">Rs {order_product.product.price}</div>
                                                                        <div className="order_product_quantity">x {order_product.quantity}</div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))
                                                }
                                                <div className="order_details_container">
                                                    <div className="order_status">
                                                        <div className="order_status_date">Delivered on: 22 November, 2023</div>
                                                        <div className="order_ref_id">Ref ID: 10239289df213dsa2</div>
                                                    </div>
                                                    <button className="order_query_btn">Having Queries?</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </section>
                            )
                            : <Empty message={'Nothing Ordered Yet!'} />
                    )
                    : <Loading />
            }
        </>
    )
}

export default Orders