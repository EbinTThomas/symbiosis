import React, { useEffect, useState } from 'react';
import Header from '../Common/Header';
import axios from '../../api/axios';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress';
import '../../static/styles/AboutUs.css'

function About() {
    const [aboutUs, setAboutUs] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const fetchAboutUs = async () => {
        try {
            const response = await axios.get(`/api/about/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setAboutUs(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAboutUs();
    }, [])

    return (
        <>
            <Header />
            <section className={`section_content section_about_us ${isLoading && 'loading'}`}>
                {
                    isLoading
                        ? <CircularProgress color="warning" />
                        : <ReactMarkdown>{aboutUs.content}</ReactMarkdown>
                }
            </section>
        </>
    );
}

export default About;
