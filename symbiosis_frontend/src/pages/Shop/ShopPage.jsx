import React from 'react'
import SectionProductList from './components/SectionProductList'
import "../../static/styles/ShopPage.css"
import Header from '../Common/Header'

function ShopPage() {
    return (
        <section className="section_content">
            <Header />
            <div className="tag_flex_box">
                <div className="search_result_tag">
                    Search Results for<br /><span>"Cur"</span>
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
            <SectionProductList />
        </section>
    )
}

export default ShopPage