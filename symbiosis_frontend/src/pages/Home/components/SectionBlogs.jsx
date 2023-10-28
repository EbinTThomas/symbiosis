import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';

function SectionBlogs() {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNewsList = async (count) => {
        try {
            const response = await axios.get(`/api/news_list/3/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setNewsList(response.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchNewsList();
    }, []);

    return (
        <section id="section_blogs">
            <h2 className="section_title">NEWS</h2>
            <div className="blogs_container">
                <div className="news_scrollbar">
                    {newsList.map((news) => (
                        <Link to={`/news/${news.id}`} key={news.id} className="news_card">
                            <img src="https://img.freepik.com/premium-psd/protein-jar-mockup_323682-39.jpg" alt="" className="news_card_thumb" />
                            <h3 className="news_card_title">{news.title}</h3>
                            <p className="news_card_desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit justo at justo varius, sit amet tristique erat ultrices. Aenean at ante nec justo varius bibendum. Sed tincidunt tellus in lectus facilisis, eu rhoncus mauris congue. Nunc ac libero a est vehicula tempor. Fusce feugiat justo id neque posuere, eu iaculis velit bibendum.
                            </p>
                            <small className="news_card_timestamp">21 Jan, 2023 | 03:25 PM</small>
                        </Link>
                    ))}
                </div>
            </div>
            <Link to="/news" className="load_more_btn">View More</Link>
        </section>
    );
}

export default SectionBlogs;
