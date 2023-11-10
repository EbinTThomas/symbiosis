import React, { useEffect, useState } from 'react';

function Footer() {
    const [dropdown1Visible, setDropdown1Visible] = useState(false);
    const [dropdown2Visible, setDropdown2Visible] = useState(false);

    const toggleDropdown = (dropdownNumber) => {
        if (dropdownNumber === 1) {
            setDropdown1Visible(!dropdown1Visible);
            setDropdown2Visible(false); // Close other dropdown
        } else if (dropdownNumber === 2) {
            setDropdown2Visible(!dropdown2Visible);
            setDropdown1Visible(false); // Close other dropdown
        }
    };

    useEffect(() => {
        // Function to handle clicks outside of dropdowns
        const handleClickOutside = (event) => {
            if (
                dropdown1Visible &&
                !event.target.closest('#myDropdown_1') &&
                !event.target.closest('.dropdown-button')
            ) {
                setDropdown1Visible(false);
            }
            if (
                dropdown2Visible &&
                !event.target.closest('#myDropdown_2') &&
                !event.target.closest('.dropdown-button')
            ) {
                setDropdown2Visible(false);
            }
        };

        // Attach the event listener when the component mounts
        window.addEventListener('click', handleClickOutside);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [dropdown1Visible, dropdown2Visible]);

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <img src="assets/img/logo.png" alt="" />
                        <ul>
                            <li style={{ color: "#fff" }}>Trading caption</li>
                            <li>
                                <a href="#">our services</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Pages</h4>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Order now</a>
                            </li>
                            <li>
                                <a href="#">About me</a>
                            </li>
                            <li>
                                <a href="#">Blogs</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Services</h4>
                    </div>
                    <div className="footer-col">
                        <h4>Country/Region</h4>
                        <ul>
                            <li>
                                <div className="dropdown-container">
                                    <div className={`dropdown-content ${dropdown1Visible ? 'show' : ''}`} id="myDropdown_1">
                                        <a href="#">Option 1</a>
                                        <a href="#">Option 2</a>
                                        <a href="#">Option 3</a>
                                    </div>
                                    <button className="dropdown-button" onClick={() => toggleDropdown(1)}>
                                        International Version
                                        <svg
                                            width={11}
                                            height={7}
                                            viewBox="0 0 11 7"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10 1L5.5 6L1 1" stroke="#0D0D0D" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="dropdown-container">
                                    <button className="dropdown-button" onClick={() => toggleDropdown(2)}>
                                        English
                                        <svg
                                            width={11}
                                            height={7}
                                            viewBox="0 0 11 7"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10 1L5.5 6L1 1" stroke="#0D0D0D" />
                                        </svg>
                                    </button>
                                    <div className={`dropdown-content ${dropdown2Visible ? 'show' : ''}`} id="myDropdown_2">
                                        <a href="#">Option 1</a>
                                        <a href="#">Option 2</a>
                                        <a href="#">Option 3</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function toggleDropdown(id) {
    // Implement your dropdown toggle logic here
}

export default Footer;
