import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';

function formatDatetime(datetimeStr) {
    // Create a new Date object from the input datetime string
    const inputDate = new Date(datetimeStr);

    // Define month names
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Extract date components
    const day = inputDate.getDate();
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    let hours = inputDate.getHours();
    let minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" should be "12"

    // Add leading zeros to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Format the datetime
    const formattedDatetime = `${day} ${month}, ${year} | ${hours}:${minutes} ${ampm}`;
    return formattedDatetime;
}

function SectionBlogs() {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNewsList = async (count) => {
        try {
            const response = await axios.get(`/api/news_list/`, {
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
                            <img src={news.get_thumbnail} alt="" className="news_card_thumb" />
                            <h3 className="news_card_title">{news.title}</h3>
                            <p className="news_card_desc">
                                {news.content}
                            </p>
                            <small className="news_card_timestamp">{formatDatetime(news.created_at)}</small>
                        </Link>
                    ))}
                </div>
            </div>
            <Link to="/news" className="load_more_btn">View More</Link>
        </section>
    );
}

export default SectionBlogs;
