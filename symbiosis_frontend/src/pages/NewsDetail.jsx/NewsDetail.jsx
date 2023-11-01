import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import axios from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import '../../static/styles/NewsDetail.css';

function NewsDetail() {
    const [newsDetail, setNewsDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const fetchNewsDetail = async () => {
        try {
            const response = await axios.get(`/api/news_detail/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            setNewsDetail(response.data);
        } catch (error) {
            console.log(error);
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
                            <p className="news_timestamp">Published On: 27 Jan, 2023 | 03:56 PM</p>
                            <img src={newsDetail.get_thumbnail} alt="" />
                            <ReactMarkdown>{newsDetail.content}</ReactMarkdown>
                        </>
                }
            </section>
        </>
    )
}

export default NewsDetail;