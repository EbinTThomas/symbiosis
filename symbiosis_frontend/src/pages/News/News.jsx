import React, { useEffect, useState } from 'react';
import Header from '../Common/Header';
import axios from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import '../../static/styles/News.css';

function News() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(10);

  const fetchNewsList = async (count) => {
    try {
      const response = await axios.get(`/api/news_list/${count}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setNewsList(response.data);
      setLoadedCount(count);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNewsList(loadedCount);
  }, []);

  const handleLoadMore = () => {
    fetchNewsList(loadedCount + 10);
  };

  return (
    <>
      <Header />
      <section className={`section_content section_news ${isLoading && 'loading'}`}>
        {isLoading ? (
          <CircularProgress color="warning" />
        ) : (
          <div className="news_container">
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
            <button className="load_more_btn" onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </section>
    </>
  );
}

export default News;