import React from 'react'
import Header from '../Home/components/Header'
import SectionProductList from './components/SectionProductList'
import FilterNav from './components/FilterNav'
import "../../static/styles/ShopPage.css"

function ShopPage() {
    return (
        <>
            <Header />
            <FilterNav />
            <SectionProductList />
        </>
    )
}

export default ShopPage