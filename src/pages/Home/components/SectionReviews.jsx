import React from 'react';

function SectionReviews() {
    return (
        <section id="section_reviews">
            <h2 className="section_title">Reviews</h2>
            <div className="review_wrap">
                <article className="review_card">
                    <div className="review_card_inset">
                        <div className="details">
                            <h3 className="username">Jessica Evans</h3>
                            <p className="review">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                accumsan condimentum massa ac malesuada, consectetur adipiscing
                                elit.
                                <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt.
                            </p>
                        </div>
                        <div className="review_image">
                            <img src="assets/img/user.png" alt="Jessica Evans's Image" />
                        </div>
                    </div>
                    <div className="svg_wrap">
                        <svg
                            width={122}
                            height={97}
                            viewBox="0 0 122 97"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M111.041 83.1048C122.481 70.6888 121.329 54.7444 121.292 54.5625V6.0625C121.292 4.45463 120.654 2.91261 119.517 1.77567C118.38 0.638727 116.838 0 115.23 0H78.8549C72.168 0 66.7299 5.43806 66.7299 12.125V54.5625C66.7299 56.1704 67.3687 57.7124 68.5056 58.8493C69.6425 59.9863 71.1846 60.625 72.7924 60.625H91.4528C91.3247 63.6222 90.4292 66.5364 88.852 69.0882C85.7723 73.9443 79.9705 77.2605 71.5981 78.9338L66.7299 79.9038V97H72.7924C89.6644 97 102.535 92.3258 111.041 83.1048ZM44.3108 83.1048C55.7568 70.6888 54.5989 54.7444 54.5625 54.5625V6.0625C54.5625 4.45463 53.9238 2.91261 52.7868 1.77567C51.6499 0.638727 50.1079 0 48.5 0H12.125C5.43806 0 0 5.43806 0 12.125V54.5625C0 56.1704 0.638726 57.7124 1.77567 58.8493C2.9126 59.9863 4.45463 60.625 6.0625 60.625H24.7229C24.5948 63.6222 23.6993 66.5364 22.1221 69.0882C19.0423 73.9443 13.2405 77.2605 4.86819 78.9338L0 79.9038V97H6.0625C22.9344 97 35.8051 92.3258 44.3108 83.1048Z"
                                fill="#232A33"
                            />
                        </svg>
                    </div>
                </article>
                <aside className="section_tag">TESTIMONIALS</aside>
            </div>
        </section>
    );
}

export default SectionReviews;
