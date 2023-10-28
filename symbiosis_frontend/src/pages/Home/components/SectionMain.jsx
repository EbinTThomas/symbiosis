import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

function SectionMain() {
    const items = [
        {
            "id": 1,
            "thumb": "https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg"
        },
        {
            "id": 2,
            "thumb": "https://marketplace.canva.com/EAFW7JwIojo/2/0/1600w/canva-red-colorful-tips-youtube-thumbnail-FxVVsqyawqY.jpg"
        },
        {
            "id": 3,
            "thumb": "https://i.ytimg.com/vi/-kAooahA41g/maxresdefault.jpg"
        },
    ]

    return (
        <section id="section_main">
            <Carousel
                autoPlay={true}
                animation="slide"
                duration={500}
                swipe={true}
                infiniteLoop={true}
                className="image_carousel"
            >
                {items.map((item) => (
                    <Link to="/shop" key={item.id}>
                        <img src={item.thumb} alt="" />
                    </Link>
                ))}
            </Carousel>
        </section>
    );
}

export default SectionMain;
