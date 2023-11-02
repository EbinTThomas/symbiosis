import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

function SectionMain({ slides }) {
    return (
        <>
            <section id="section_main">
                <Carousel
                    autoPlay={true}
                    animation="slide"
                    duration={500}
                    swipe={true}
                    infiniteLoop={true}
                    className="image_carousel"
                >
                    {slides.map((slide) => (
                        <Link to={`/product_detail/${slide.product.id}`} key={slide.id}>
                            <img src={slide.get_image} alt="" />
                        </Link>
                    ))}
                </Carousel>
                <div className="section_divider" />
            </section>
        </>
    );
}

export default SectionMain;
