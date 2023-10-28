import React, { useState } from 'react'
import SectionProductDetail from './components/SectionProductDetail'
import '../../static/styles/ProductDetail.css'
import '../../static/styles/Layout.css'
import SectionRelatedProducts from './components/SectionRelatedProducts'
import Header from '../Common/Header'

function ProductDetail() {
  return (
    <>
      <section className="section_content">
        <Header />
        <SectionProductDetail />
        <SectionRelatedProducts />
      </section>
    </>
  )
}

export default ProductDetail