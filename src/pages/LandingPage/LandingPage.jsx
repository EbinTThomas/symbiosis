import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import ImageCarousel from './components/ImageCarousel'
import '../../static/styles/LandingPage.css'
import { Link } from 'react-router-dom';
import ImageGrid from './components/ImageGrid';
import axios from '../../api/axios';

function LandingPage() {
    const [pageComponents, setPageComponents] = useState([]);
    const fetchComponents = async () => {
        try {
            const response = await axios.get(`/api/ad_page/?id=${1}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setPageComponents(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchComponents();
    }, [location.pathname])

    return (
        <>
            <Header />
            <section id="section_landing">
                {
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
                                        ? <Link to=""><img src={item.data.get_image} alt="" className="ad_banner" /></Link>
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
        </>
    )
}

export default LandingPage
