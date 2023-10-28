import React from 'react'
import Header from '../Common/Header'
import HorizontalLinearStepper from './components/HorizontalLinearStepper'
import '../../static/styles/ShoppingCart.css';

function ShoppingCart() {
    return (
        <section className="section_content">
            <Header />
            <HorizontalLinearStepper />
        </section>
    )
}

export default ShoppingCart