import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../../../static/styles/ImageCarousel.css';

import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';

function ImageCarousel({sliderImages}) {

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            className="mySwiper"
        >
            {sliderImages.map((sliderImage, i) => (
                <SwiperSlide key={i}>
                    <Link to={sliderImage.brand ? `/brand/${sliderImage.brand}` : sliderImage.product && `/product/${sliderImage.product}`}>
                        <img src={sliderImage.get_image} alt="" className="slider_image" />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ImageCarousel;
