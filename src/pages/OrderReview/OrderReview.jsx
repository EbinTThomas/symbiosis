import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import '../../static/styles/OrderReview.css'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../Common/Footer'
import axios from '../../api/axios'
import Loading from '../Common/Loading'

function OrderReview() {
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [starRating, setStarRating] = useState(0);
    const [reviewDescription, setReviewDescription] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const { order_id } = useParams();
    const ORDER_DETAIL_URL = `/api/order/orders/${order_id}/`;

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

    const handleStarClick = (quantity) => {
        setStarRating(quantity);
    };

    const handleReviewSubmit = async () => {
        try {
            const response = await axios.post('/api/order/order_review/',
                {
                    "rating": starRating,
                    "review_description": reviewDescription,
                    "review_title": reviewTitle,
                    "order_id": order_id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    }
                }
            );

            navigate('/orders', { replace: true })
        } catch (error) {
            console.log(error)
            // Handle error
        }
    };

    return (
        <>
            <Header />
            <BackButton />
            <PageTitle title={"Ratings & Reviews"} />
            {
                isLoading ? <Loading />
                    : order.is_reviewed
                        ? navigate('/orders', { replace: true })
                        : <section className="section_order_review">
                            <div className="review_product_container">
                                <img src="" alt="" className="review_product_thumb" />
                            </div>
                            <div className="rating_title">Rate this product</div>
                            <div className="rating_container">
                                {[1, 2, 3, 4, 5].map((quantity) => (
                                    <svg
                                        key={quantity}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill={quantity <= starRating ? "black" : "none"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleStarClick(quantity)}
                                        className={`star-icon ${quantity <= starRating ? 'success' : ''}`}
                                    >
                                        <path d="M12.8649 2.99628C12.4796 2.33213 11.5204 2.33213 11.1351 2.99628L8.42101 7.67359C8.23064 8.00168 7.90159 8.22557 7.52653 8.28222L2.44021 9.05044C1.58593 9.17947 1.28627 10.2581 1.95158 10.8093L5.74067 13.9485C6.09141 14.2391 6.25633 14.6975 6.17113 15.1449L5.17996 20.35C5.02327 21.1729 5.88706 21.8122 6.62821 21.4219L11.4176 18.9001C11.7821 18.7082 12.2178 18.7082 12.5824 18.9001L17.3718 21.4219C18.1129 21.8122 18.9767 21.1729 18.82 20.35L17.8289 15.1449C17.7437 14.6975 17.9086 14.2391 18.2593 13.9485L22.0484 10.8093C22.7137 10.2581 22.4141 9.17947 21.5598 9.05044L16.4735 8.28222C16.0984 8.22557 15.7694 8.00168 15.579 7.67359L12.8649 2.99628Z" fill="black" />
                                    </svg>
                                ))}
                            </div>
                            <div className="review_title">Review this product</div>
                            <div className="review_input_container">
                                <input type="text" className="review_input_title" placeholder="Review title..." onChange={(e) => setReviewTitle(e.target.value)} />
                            </div>
                            <div className="review_input_container">
                                <textarea name="" id="" className="review_input_description" placeholder="Description..." onChange={(e) => setReviewDescription(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="review_btn" onClick={handleReviewSubmit}>Submit</button>
                        </section>
            }
            <Footer />
        </>
    )
}

export default OrderReview
