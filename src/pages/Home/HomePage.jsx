import React, { useEffect, useState } from 'react'
import SectionMain from './components/SectionMain'
import SectionWelcome from './components/SectionWelcome'
import SectionProducts from './components/SectionProducts'
import SectionGallery from './components/SectionGallery'
import SectionReviews from './components/SectionReviews'
import SectionBlogs from './components/SectionBlogs'
import Footer from './components/Footer'
import '../../static/styles/HomePage.css'
import Header from '../Common/Header'
import axios from '../../api/axios'

const HOMEPAGE_URL = '/api/homepage/'

function HomePage() {
  const [slides, setSlides] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchHomePage = async () => {
    try {
      const response = await axios.get(
        HOMEPAGE_URL,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setSlides(response.data.slides)
      setProducts(response.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchHomePage();
  }, [])

  return (
    <>
      <Header />
      <SectionMain slides={slides} />
      <section className="section_content">
        <SectionWelcome />
        <SectionProducts products={products} />
        <SectionGallery />
        <SectionReviews />
        <SectionBlogs />
      </section>
      <Footer />
    </>
  )
}

export default HomePage