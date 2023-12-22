import React, { useEffect, useState } from 'react'
import "../../static/styles/ShopPage.css"
import Header from '../Common/Header'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'
import SectionProductList from '../Shop/components/SectionProductList'
import Footer from '../Common/Footer'

function SearchResults() {
    const { search_key } = useParams();
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product/search/?query=${search_key}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [search_key])

    return (
        <>
            <Header />
            <section className="section_content">
                <div className="tag_flex_box">
                    <div className="search_result_tag">
                        Search Results for<br /><span>"{search_key}"</span>
                    </div>
                    <a href="" className="product_filter_btn">
                        Filter
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="16" height="1" rx="0.5" fill="white" fill-opacity="0.48" />
                            <rect x="2" y="5" width="12" height="1" rx="0.5" fill="white" fill-opacity="0.48" />
                            <rect x="5" y="10" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.48" />
                        </svg>
                    </a>
                </div>
                <SectionProductList products={products} />
            </section>
            <Footer />
        </>
    )
}

export default SearchResults