import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import '../../static/styles/Auth.css'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

function Auth() {
    const slides = [
        {
            "id": 1,
            "image": "./assets/img/square.jpg",
            "product": {
                "id": 2
            }
        },
        {
            "id": 2,
            "image": "./assets/img/square.jpg",
            "product": {
                "id": 1
            }
        },
        {
            "id": 3,
            "image": "./assets/img/square.jpg",
            "product": {
                "id": 3
            }
        }
    ]
    return (
        <section id="section_auth">
            <div className="flex_box">
                <div className="flex_item">
                    <div className="auth_form_container">
                        <img src="./assets/img/logo.png" alt="" className="auth_form_logo" />
                        <form action="" className="auth_form">
                            <h1>Welcome Back</h1>
                            <p>Welcome back, Please enter your details</p>
                            <div className="auth_switch_container">
                                <button className="auth_switch active">Login</button>
                                <button className="auth_switch">Signup</button>
                            </div>
                            <div className="text_field_container">
                                <svg className="text_field_ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75464 12C4.75464 7.99594 8.00057 4.75 12.0046 4.75C16.0087 4.75 19.2546 7.99594 19.2546 12C19.2546 12.0337 19.2569 12.0668 19.2612 12.0993C19.2579 12.1307 19.2567 12.1626 19.2574 12.1949C19.2636 12.4495 19.231 12.8444 19.1474 13.2219C19.0563 13.6331 18.9376 13.8694 18.8682 13.9423C18.5663 14.2591 18.1509 14.4429 17.7135 14.4535C17.276 14.464 16.8522 14.3003 16.5354 13.9984C16.3283 13.801 16.2689 13.5113 16.2527 12.8381L16.1372 8.04002C16.1273 7.62592 15.7835 7.29831 15.3694 7.30828C14.9553 7.31825 14.6277 7.66201 14.6377 8.07611L14.6543 8.76875C13.9332 8.17672 13.0104 7.82135 12.0046 7.82135C9.69686 7.82135 7.82605 9.69216 7.82605 11.9999C7.82605 14.3077 9.69686 16.1785 12.0046 16.1785C13.279 16.1785 14.4202 15.608 15.1866 14.7084C15.2726 14.8392 15.376 14.9655 15.5006 15.0843C16.1054 15.6606 16.9144 15.9731 17.7495 15.953C18.5847 15.9329 19.3777 15.5819 19.9541 14.9771C20.3238 14.5892 20.5109 14.0022 20.6119 13.5463C20.7203 13.0566 20.7662 12.5406 20.757 12.1588C20.7563 12.1313 20.7542 12.1042 20.7507 12.0775C20.7533 12.052 20.7546 12.0262 20.7546 12C20.7546 7.16751 16.8371 3.25 12.0046 3.25C7.17215 3.25 3.25464 7.16751 3.25464 12C3.25464 16.8325 7.17215 20.75 12.0046 20.75C14.0477 20.75 15.929 20.0489 17.4183 18.8747C17.7435 18.6182 17.7993 18.1466 17.5428 17.8213C17.2864 17.4961 16.8148 17.4403 16.4895 17.6968C15.2554 18.6698 13.6988 19.25 12.0046 19.25C8.00057 19.25 4.75464 16.0041 4.75464 12ZM12.0046 9.32135C10.5253 9.32135 9.32605 10.5206 9.32605 11.9999C9.32605 13.4793 10.5253 14.6785 12.0046 14.6785C13.484 14.6785 14.6832 13.4793 14.6832 11.9999C14.6832 10.5206 13.484 9.32135 12.0046 9.32135Z" fill="black" />
                                </svg>
                                <TextField label="Email" variant="outlined"
                                    inputProps={{
                                        style: {
                                            padding: 0,
                                        }
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex_item">
                    <Carousel
                        autoPlay={true}
                        animation="slide"
                        duration={500}
                        swipe={true}
                        infiniteLoop={true}
                        className="image_carousel"
                    >
                        {slides.map((slide) => (
                            <Link to={`/product_detail/${slide.product.id}`} key={slide.id}>
                                <img src={slide.image} alt="" />
                            </Link>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

export default Auth