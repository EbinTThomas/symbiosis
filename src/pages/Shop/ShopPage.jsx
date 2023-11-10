import React, { useEffect, useState, useRef } from 'react';
import SectionProductList from './components/SectionProductList';
import '../../static/styles/ShopPage.css';
import Header from '../Common/Header';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

function ShopPage() {
    const { search_key } = useParams();
    const [products, setProducts] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [brandList, setBrandList] = useState([]);

    const filterContainerRef = useRef(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchBrandList = async () => {
        try {
            const response = await axios.get(`/api/product/brand-list/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setBrandList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilterButtonClick = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleDocumentClick = (e) => {
        if (filterContainerRef.current && !filterContainerRef.current.contains(e.target)) {
            setIsFilterOpen(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchBrandList();
    }, []);

    return (
        <section className="section_content">
            <Header />
            <div className="tag_flex_box">
                <div className="filter_wrap">
                    <a href="#" className="product_filter_btn" onClick={handleFilterButtonClick}>
                        Filter
                        <svg
                            width="16"
                            height="11"
                            viewBox="0 0 16 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="16" height="1" rx="0.5" fill="white" fillOpacity="0.48" />
                            <rect x="2" y="5" width="12" height="1" rx="0.5" fill="white" fillOpacity="0.48" />
                            <rect x="5" y="10" width="6" height="1" rx="0.5" fill="white" fillOpacity="0.48" />
                        </svg>
                    </a>
                    {isFilterOpen && (
                        <div className="filter_dropdown_container" ref={filterContainerRef}>
                            {/* Filter options */}
                            <div className="filter_item">
                                <div className="filter_item_title">Brands</div>
                                <ul className="filter_item_list">
                                    {brandList.map(brand => (
                                        <li>
                                            <input type="checkbox" name="" id="item" />
                                            <label htmlFor="item">{brand.name}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="filter_dropdown_bottom">
                                <button className="filter_apply_btn">Apply</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <SectionProductList products={products} />
        </section>
    );
}

export default ShopPage;
