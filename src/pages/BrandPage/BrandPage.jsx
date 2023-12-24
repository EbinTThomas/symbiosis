import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Common/Loading';
import axios from '../../api/axios';
import SectionProductList from '../Shop/components/SectionProductList';
import '../../static/styles/BrandPage.css';
import ImageCarousel from '../LandingPage/components/ImageCarousel';
import ImageGrid from '../LandingPage/components/ImageGrid';

function BrandPage() {
    const { brand_id } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pageComponents, setPageComponents] = useState([]);
    const fetchComponents = async () => {
        try {
            const response = await axios.get(`/api/ad_page/?type=brand&title=${brand_name}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setPageComponents(response.data);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBrandProducts = async () => {
        try {
            const response = await axios.get(`/api/product/search/item/?brand_ids=${brand_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setProducts(response.data);
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchComponents()
        fetchBrandProducts()
    }, [brand_id])

    return (
        <>
            <Header />
            <section id="section_landing">
                {
                    pageComponents.length > 0 &&
                    pageComponents.map((item) => (
                        <div className="section_landing_item">
                            {
                                item.data.title && <center><h1 className="ad_title">{item.data.title}</h1></center>
                            }
                            {
                                item.type === 'slider'
                                    ? <section className="section_carousel">
                                        <ImageCarousel sliderImages={item.data.slides} />
                                    </section>
                                    : item.type === 'banner'
                                        ? <Link to={item.data.product && `/product_detail/${item.data.product}`}><img src={item.data.get_image} alt="" className="ad_banner" /></Link>
                                        : item.type === 'grid'
                                            ?
                                            <section className="section_grid" id="section_product_list">
                                                <ImageGrid items={item.data.items} />
                                            </section> : null
                            }
                        </div>
                    ))
                }
            </section>
            {
                !isLoading
                    ? <section className="section_brandpage section_content">
                        <SectionProductList products={products} />
                    </section>
                    : <Loading />
            }
            <Footer />
        </>
    )
}

export default BrandPage
