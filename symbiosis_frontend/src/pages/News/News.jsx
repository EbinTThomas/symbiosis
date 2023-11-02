import React, { useEffect, useState } from 'react';
import Header from '../Common/Header';
import axios from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import '../../static/styles/News.css';

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

function News() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastNewsId, setLastNewsId] = useState(null);
  const [lastNews, setLastNews] = useState(false);

  const fetchNewsList = async (lastId) => {
    try {
      const response = await axios.get('/api/news_list/', {
        params: { last_id: lastId }, // Pass last news ID as a query parameter
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data)
      if (response.data.length === 0) {
        setLastNews(true);
      } else {
        setNewsList([...newsList, ...response.data]);
        setLastNewsId(response.data[response.data.length - 1].id);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNewsList(null); // Fetch the latest news at initial load
  }, []);

  const handleLoadMore = () => {
    if (lastNewsId !== null) {
      fetchNewsList(lastNewsId);
    }
  };

  return (
    <>
      <Header />
      <section className={`section_content section_news ${isLoading ? 'loading' : (newsList.length === 0 && 'loading')}`}>
        {
          isLoading ? (
            <CircularProgress color="warning" />
          ) : (
            newsList.length > 0 && (
              <div className="news_container">
                {newsList.map((news) => (
                  <Link to={`/news/${news.id}`} key={news.id} className="news_card">
                    <img src={news.get_thumbnail} alt="" className="news_card_thumb" />
                    <h3 className="news_card_title">{news.title}</h3>
                    <p className="news_card_desc">{news.content}</p>
                    <small className="news_card_timestamp">{formatDatetime(news.created_at)}</small>
                  </Link>
                ))}
                {
                  !lastNews &&
                  <button className="load_more_btn" onClick={handleLoadMore}>
                    Load More
                  </button>
                }
              </div>
            )
          )
        }
        {newsList.length === 0 && <div className="center_text"><span>No News Yet!</span></div>}
      </section>
    </>
  );
}

export default News;
