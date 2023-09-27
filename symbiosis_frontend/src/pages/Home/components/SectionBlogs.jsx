import React from 'react';

function SectionBlogs() {
    return (
        <section id="section_blogs">
            <div className="blogs_container">
                <article className="blog_card">
                    <img src="assets/img/1.png" alt="" />
                    <h4 className="title">Reasons to join us</h4>
                    <p className="desc">
                        Design Club is a digital agency specialized in ecommerce. We build
                        scalable, high-end web shops.
                    </p>
                </article>
                <article className="blog_card">
                    <img src="assets/img/2.png" alt="" />
                    <h4 className="title">Recruitment</h4>
                    <p className="desc">
                        Design Club is a digital agency specialized in ecommerce. We build
                        scalable, high-end web shops.
                    </p>
                </article>
                <article className="blog_card">
                    <img src="assets/img/3.png" alt="" />
                    <h4 className="title">how a creative agency can help?</h4>
                    <p className="desc">
                        Design Club is a digital agency specialized in ecommerce. We build
                        scalable, high-end web shops.
                    </p>
                </article>
            </div>
            <h2 className="title">NEWS</h2>
        </section>
    );
}

export default SectionBlogs;
