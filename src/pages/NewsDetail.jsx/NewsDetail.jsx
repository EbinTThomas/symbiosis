import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import axios from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import '../../static/styles/NewsDetail.css';
import Footer from '../Common/Footer';

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

function NewsDetail() {
    const [newsDetail, setNewsDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const fetchNewsDetail = async () => {
        try {
            const response = await axios.get(`/api/news_detail/${id}/`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setNewsDetail(response.data);
        } catch (error) {
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchNewsDetail();
    }, [id]);

    return (
        <>
            <Header />
            <section className={`section_content section_news_detail ${isLoading && 'loading'}`}>
                {
                    isLoading
                        ? <CircularProgress color="warning" />
                        : <>
                            <h1 className="news_detail_title">{newsDetail.title}</h1>
                            <p className="news_timestamp">Published On: {formatDatetime(newsDetail.created_at)}</p>
                            <img src={newsDetail.get_thumbnail} alt="" />
                            <ReactMarkdown>{newsDetail.content}</ReactMarkdown>
                        </>
                }
            </section>
            <Footer />
        </>
    )
}

export default NewsDetail;