import React from 'react'
import Header from './components/Header'
import SectionMain from './components/SectionMain'
import SectionWelcome from './components/SectionWelcome'
import SectionProducts from './components/SectionProducts'
import SectionGallery from './components/SectionGallery'
import SectionReviews from './components/SectionReviews'
import SectionBlogs from './components/SectionBlogs'
import Footer from './components/Footer'
import '../../static/styles/HomePage.css'

function HomePage() {
  return (
    <>
      <Header />
      <SectionMain />
      <div className="section_divider" />
      <SectionWelcome />
      <SectionProducts />
      <SectionGallery />
      <SectionReviews />
      <SectionBlogs />
      <Footer />
    </>
  )
}

export default HomePage