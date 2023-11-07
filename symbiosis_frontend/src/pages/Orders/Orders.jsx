import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import { Link } from 'react-router-dom'
import '../../static/styles/Orders.css'
import axios from '../../api/axios'

const ORDERS_URL = '/api/order/orders/'

function Orders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');

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
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <>
            <Header />
            <section className="section_content orders_page">
                <div className="order_container">
                    <Link to="/product_detail/2" className="order_product">
                        <img src="https://img2.hkrtcdn.com/28400/prd_2839991-MuscleBlaze-Beginners-Protein-Powder-4.4-lb-Chocolate_o.jpg" className="order_product_thumb" alt="" />
                        <div className="order_product_details">
                            <div className="order_product_title">Protein Powder</div>
                            <p className="order_product_description">This is the description for the protein powder.</p>
                            <div className="bottom_container">
                                <div className="order_product_price">Rs 380.00</div>
                                <div className="order_product_quantity">x 3</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product_detail/2" className="order_product">
                        <img src="https://img2.hkrtcdn.com/28400/prd_2839991-MuscleBlaze-Beginners-Protein-Powder-4.4-lb-Chocolate_o.jpg" className="order_product_thumb" alt="" />
                        <div className="order_product_details">
                            <div className="order_product_title">Protein Powder</div>
                            <p className="order_product_description">This is the description for the protein powder.</p>
                            <div className="bottom_container">
                                <div className="order_product_price">Rs 380.00</div>
                                <div className="order_product_quantity">x 3</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product_detail/2" className="order_product">
                        <img src="https://img2.hkrtcdn.com/28400/prd_2839991-MuscleBlaze-Beginners-Protein-Powder-4.4-lb-Chocolate_o.jpg" className="order_product_thumb" alt="" />
                        <div className="order_product_details">
                            <div className="order_product_title">Protein Powder</div>
                            <p className="order_product_description">This is the description for the protein powder.</p>
                            <div className="bottom_container">
                                <div className="order_product_price">Rs 380.00</div>
                                <div className="order_product_quantity">x 3</div>
                            </div>
                        </div>
                    </Link>
                    <div className="order_details_container">
                        <div className="order_status">
                            <div className="order_status_date">Delivered on: 22 November, 2023</div>
                            <div className="order_ref_id">Ref ID: 10239289df213dsa2</div>
                        </div>
                        <button className="order_query_btn">Having Queries?</button>
                    </div>
                </div>
                <div className="order_container">
                    <Link to="/product_detail/2" className="order_product">
                        <img src="https://img2.hkrtcdn.com/28400/prd_2839991-MuscleBlaze-Beginners-Protein-Powder-4.4-lb-Chocolate_o.jpg" className="order_product_thumb" alt="" />
                        <div className="order_product_details">
                            <div className="order_product_title">Protein Powder</div>
                            <p className="order_product_description">This is the description for the protein powder.</p>
                            <div className="bottom_container">
                                <div className="order_product_price">Rs 380.00</div>
                                <div className="order_product_quantity">x 3</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product_detail/2" className="order_product">
                        <img src="https://img2.hkrtcdn.com/28400/prd_2839991-MuscleBlaze-Beginners-Protein-Powder-4.4-lb-Chocolate_o.jpg" className="order_product_thumb" alt="" />
                        <div className="order_product_details">
                            <div className="order_product_title">Protein Powder</div>
                            <p className="order_product_description">This is the description for the protein powder.</p>
                            <div className="bottom_container">
                                <div className="order_product_price">Rs 380.00</div>
                                <div className="order_product_quantity">x 3</div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/product_detail/2" className="order_product">
                        <img src="https://img2.hkrtcdn.com/28400/prd_2839991-MuscleBlaze-Beginners-Protein-Powder-4.4-lb-Chocolate_o.jpg" className="order_product_thumb" alt="" />
                        <div className="order_product_details">
                            <div className="order_product_title">Protein Powder</div>
                            <p className="order_product_description">This is the description for the protein powder.</p>
                            <div className="bottom_container">
                                <div className="order_product_price">Rs 380.00</div>
                                <div className="order_product_quantity">x 3</div>
                            </div>
                        </div>
                    </Link>
                    <div className="order_details_container">
                        <div className="order_status">
                            <div className="order_status_date">Delivered on: 22 November, 2023</div>
                            <div className="order_ref_id">Ref ID: 10239289df213dsa2</div>
                        </div>
                        <button className="order_query_btn">Having Queries?</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Orders