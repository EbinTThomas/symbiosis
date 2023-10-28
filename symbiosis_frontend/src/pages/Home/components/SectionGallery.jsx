import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function SectionGallery() {
    return (
        <section id="section_gallery">
            <h2 className="section_title">GALLERY</h2>
            <ImageList sx={{ width: "100%", height: "auto" }} variant="masonry" cols={2} gap={24} className="image-grid">
                {itemData.map((item) => (
                    <ImageListItem key={item.img} className="image">
                        <img
                            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=161&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{
                                background: 'none'
                            }}
                            title={item.title}
                            position="bottom"
                            actionPosition="left"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <a href="#section_gallery" className="a_highlighted">
                <div className="back_light" />
                <span>
                    View All Gallery
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.49865 3.82031L9.67698 9.99865L3.49865 16.177L2.32031 14.9986L7.32031 9.99865L2.32031 4.99865L3.49865 3.82031Z"
                            fill="#0D0D0D"
                        />
                    </svg>
                </span>
            </a>
        </section>
        // <section id="section_gallery">
        //     <h2 className="section_title">GALLERY</h2>
        //     <div className="image-grid">
        //         <div className="image">
        //             <img src="assets/img/img1.png" alt="Image 1" />
        //             <figcaption />
        //         </div>
        //         <div className="image">
        //             <img src="assets/img/img2.png" alt="Image 2" />
        //             <figcaption>Product - Design</figcaption>
        //         </div>
        //         <div className="image">
        //             <img src="assets/img/img3.png" alt="Image 3" />
        //             <figcaption>Product - Design</figcaption>
        //         </div>
        //         <div className="image">
        //             <img src="assets/img/img4.png" alt="Image 4" />
        //             <figcaption>eousva - Product Branding</figcaption>
        //         </div>
        //         <div className="image">
        //             <img src="assets/img/img5.png" alt="Image 5" />
        //             <figcaption>Social Media</figcaption>
        //         </div>
        //         <div className="image">
        //             <img src="assets/img/img6.png" alt="Image 6" />
        //             <figcaption>Product - Design</figcaption>
        //         </div>
        //     </div>
        //     <a href="" className="a_highlighted">
        //         <div className="back_light" />
        //         <span>
        //             View All Gallery
        //             <svg
        //                 width={20}
        //                 height={20}
        //                 viewBox="0 0 20 20"
        //                 fill="none"
        //                 xmlns="http://www.w3.org/2000/svg"
        //             >
        //                 <path
        //                     fillRule="evenodd"
        //                     clipRule="evenodd"
        //                     d="M3.49865 3.82031L9.67698 9.99865L3.49865 16.177L2.32031 14.9986L7.32031 9.99865L2.32031 4.99865L3.49865 3.82031Z"
        //                     fill="#0D0D0D"
        //                 />
        //             </svg>
        //         </span>
        //     </a>
        // </section>
    );
}

export default SectionGallery;

const itemData = [
    {
        img: 'assets/img/img1.png',
        title: '',
    },
    {
        img: 'assets/img/img2.png',
        title: 'Product - Design',
    },
    {
        img: 'assets/img/img3.png',
        title: 'Product - Design',
    },
    {
        img: 'assets/img/img4.png',
        title: 'eousva - Product Branding',
    },
    {
        img: 'assets/img/img5.png',
        title: 'Social Media',
    },
    {
        img: 'assets/img/img6.png',
        title: 'Product - Design',
    }
];