
import React, { useEffect, useState, useRef } from 'react';
import SectionProductList from './components/SectionProductList';
import '../../static/styles/ShopPage.css';
import Header from '../Common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../Common/Loading';
import Empty from '../Common/Empty';
import Footer from '../Common/Footer';

function ShopPage() {
    const { search_key } = useParams();
    const [products, setProducts] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [brandList, setBrandList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [brandSearch, setBrandSearch] = useState('');
    const navigate = useNavigate();

    const filterContainerRef = useRef(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/product/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setProducts(response.data);
        } catch (error) {
        }
        setIsLoading(false);
    };

    const fetchBrandList = async () => {
        try {
            const response = await axios.get(`/api/product/brand-list/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const brandListWithSelection = response.data.map(brand => ({ ...brand, selected: false }));
            setBrandList(brandListWithSelection);
        } catch (error) {
        }
    };

    const handleFilterButtonClick = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleFilter = async () => {
        const selectedBrandIds = brandList.filter(brand => brand.selected).map(brand => brand.id);

        try {
            const response = await axios.get(`/api/product/search/item/?brand_ids=${selectedBrandIds.join(',')}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setProducts(response.data);
        } catch (error) {
            // Handle error
        }
        setIsFilterOpen(false);
    }

    useEffect(() => {
        fetchProducts();
        fetchBrandList();
    }, []);

    const toggleBrandSelection = (brandId) => {
        setBrandList(prevBrandList => {
            const updatedBrandList = prevBrandList.map(brand => {
                if (brand.id === brandId) {
                    return {
                        ...brand,
                        selected: !brand.selected,
                    };
                }
                return brand;
            });
            return updatedBrandList;
        });
    };

    const handleBrandSearchChange = (event) => {
        setBrandSearch(event.target.value);
    };

    const filteredBrandList = brandList.filter(
        (brand) => brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const handleReset = () => {
        // Reset filter-related states
        setBrandList((prevBrandList) =>
            prevBrandList.map((brand) => ({
                ...brand,
                selected: false,
            }))
        );
        setBrandSearch('');
        setSelectedBrands([]);
    };

    const handleBack = () => {
        navigate(-1, { replace: true })
    }

    return (
        <>
            <Header />
            <section className="section_content shop_page">
                <div className="tag_flex_box">
                    <button className="back_btn" onClick={handleBack}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L10.5607 12L14.0303 15.4697C14.3232 15.7626 14.3232 16.2374 14.0303 16.5303C13.7374 16.8232 13.2626 16.8232 12.9697 16.5303L8.96967 12.5303C8.67678 12.2374 8.67678 11.7626 8.96967 11.4697L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z" fill="black" />
                        </svg>
                        Back
                    </button>
                    {
                        !isLoading &&
                        <div className="filter_wrap">
                            <a href="#" className="product_filter_btn" onClick={handleFilterButtonClick}>
                                Filter
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="black" />
                                </svg>
                            </a>
                            {isFilterOpen && (
                                <>
                                    <div className="filter_overlay" onClick={handleFilterButtonClick}></div>
                                    <div className="filter_dropdown_container" ref={filterContainerRef}>
                                        <div className="filter_dropdown_head">
                                            <button className="cancel_btn" onClick={handleFilterButtonClick}>Cancel</button>
                                            <div className="filter_dropdown_title">
                                                Filter
                                                {/* <p>Orders 10 of 22</p> */}
                                            </div>
                                            <button className="reset_btn" onClick={handleReset}>Reset</button>
                                        </div>
                                        {/* Filter options */}
                                        <div className="filter_item">
                                            <div className="filter_item_title">Brands</div>
                                            <div className="filter_brand_search_container">
                                                <input
                                                    type="text"
                                                    className="search_bar"
                                                    placeholder="Search for brands"
                                                    onChange={handleBrandSearchChange}
                                                    value={brandSearch}
                                                />
                                            </div>
                                            <ul className="filter_item_list">
                                                {filteredBrandList.map((brand) => (
                                                    <li key={brand.name}>
                                                        <label htmlFor={brand.name}>
                                                            <input
                                                                type="checkbox"
                                                                id={brand.name}
                                                                onChange={() => toggleBrandSelection(brand.id)}
                                                                checked={brand.selected}
                                                            />
                                                            {brand.name}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="filter_dropdown_bottom">
                                            <button className="filter_apply_btn" onClick={handleFilter}>Apply</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    }
                </div>
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                        <SectionProductList products={products} />
                    )
                }
                {!isLoading && products.length === 0 && <Empty message={'No Products Found!'} />}
            </section>
            <Footer />
        </>
    );
}

export default ShopPage;
