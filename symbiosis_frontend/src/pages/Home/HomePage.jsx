import React from 'react'
import SectionMain from './components/SectionMain'
import SectionWelcome from './components/SectionWelcome'
import SectionProducts from './components/SectionProducts'
import SectionGallery from './components/SectionGallery'
import SectionReviews from './components/SectionReviews'
import SectionBlogs from './components/SectionBlogs'
import Footer from './components/Footer'
import '../../static/styles/HomePage.css'
import Header from '../Common/Header'

function HomePage() {
  return (
    <>
      <Header />
      <SectionMain />
      <div className="section_divider" />
      <section className="section_content">
        <SectionWelcome />
        <SectionProducts />
        <SectionGallery />
        <SectionReviews />
        <SectionBlogs />
      </section>
      <Footer />
    </>
  )
}

export default HomePage