import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideNav from './SideNav';
import { useLayoutContext } from './LayoutContext';
import axios from '../../api/axios';

function Header() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') ? true : false);
    const [authNavDropdown, setAuthNavDropdown] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [sideNav, setSideNav] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();
    const { cartCount } = useLayoutContext();
    const authNavDropdownRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const handleScroll = () => {

            const currentScrollPos = window.pageYOffset;
            setPrevScrollPos(currentScrollPos);

            // Check if the user has scrolled 100px from the top
            if (currentScrollPos > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Check if the user is scrolling up or down
            const isScrollingDown = currentScrollPos > prevScrollPos;

            // Update the scroll direction
            if (isScrollingDown && isHeaderVisible) {
                setIsHeaderVisible(false);
            } else if (!isScrollingDown && !isHeaderVisible) {
                setIsHeaderVisible(true);
            }

            // Update the previous scroll position
            setPrevScrollPos(currentScrollPos);
        };

        // Add a scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHeaderVisible, prevScrollPos]);

    // Function to handle live search
    const handleLiveSearch = async () => {
        if (searchInput.length > 0) {
            try {
                const response = await axios.get(`/api/product/search/?query=${searchInput}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setSearchResults(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            // Clear search results if the search input is empty
            setSearchResults([]);
        }
    };

    useEffect(() => {
        handleLiveSearch();
    }, [searchInput]);

    useEffect(() => {
        // Add a click event listener to the document
        const handleClickOutside = (event) => {
            if (authNavDropdownRef.current && !authNavDropdownRef.current.contains(event.target)) {
                // Click occurred outside of the authNavDropdown, close it
                setAuthNavDropdown(false);
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Function to toggle authNavDropdown
    const toggleAuthNavDropdown = () => {
        setAuthNavDropdown(!authNavDropdown);
    };

    return (
        <>
            <header
                id="header"
                className={`${location.pathname === "/" ? 'home' : ''} ${scrolled ? 'scrolled' : ''} ${!isHeaderVisible ? 'hide' : ''}`}
                style={{ top: isHeaderVisible ? '0px' : '-100px' }}
            >
                <div className="logo_container">
                    <button className="open_sidenav_btn" onClick={() => setSideNav(sideNav ? false : true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect x="3" y="5" width="18" height="1.38462" rx="0.692308" fill="black" />
                            <rect x="3" y="11.2307" width="18" height="1.38462" rx="0.692308" fill="black" />
                            <rect x="3" y="17.4615" width="9" height="1.38462" rx="0.692308" fill="black" />
                        </svg>
                    </button>
                    <div className="logo_thumbnail"></div>
                </div>
                <nav className="header_main_nav">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        Home
                    </Link>
                    <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                    <Link to="/news" className={location.pathname === '/news' ? 'active' : ''}>News</Link>
                    <Link to="/contact" className="a_highlighted">
                        <div className="back_light" />
                        <span>
                            Let's Talk
                            <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.49865 3.82031L9.67698 9.99865L3.49865 16.177L2.32031 14.9986L7.32031 9.99865L2.32031 4.99865L3.49865 3.82031Z"
                                    fill="#0D0D0D"
                                />
                            </svg>
                        </span>
                    </Link>
                </nav>
                <nav className="right_nav">
                    <div className={`search_bar_container ${!searchActive ? "hide" : ''}`}>
                        <button className="close_search_btn" onClick={() => setSearchActive(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="black" />
                            </svg>
                        </button>
                        <input type="text" className="search_bar" placeholder="Search for products..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                        {
                            searchInput.length !== 0 &&
                            <ul className="search_suggestions">
                                {
                                    searchResults.length > 0
                                        ? searchResults.map((searchResult) => (
                                            <li>
                                                <Link to={`/shop/${searchResult.name}`} className="search_suggestion" onClick={() => {
                                                    setSearchInput('');
                                                    setSearchActive(false);
                                                }}>
                                                    <div className="flex_pair">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.385 15.4458C11.7348 17.5685 7.85532 17.4014 5.39854 14.9446C2.7625 12.3086 2.7625 8.0347 5.39854 5.39866C8.03458 2.76262 12.3084 2.76262 14.9445 5.39866C17.4013 7.85544 17.5683 11.7349 15.4457 14.3851L20.6013 19.5408C20.8942 19.8337 20.8942 20.3085 20.6013 20.6014C20.3084 20.8943 19.8335 20.8943 19.5407 20.6014L14.385 15.4458ZM6.4592 13.8839C4.40895 11.8337 4.40895 8.50957 6.4592 6.45932C8.50945 4.40907 11.8336 4.40907 13.8838 6.45932C15.9326 8.50807 15.9341 11.8288 13.8883 13.8794C13.8868 13.8809 13.8853 13.8824 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9342 8.50795 15.9327 6.4592 13.8839Z" fill="black" />
                                                        </svg>
                                                        <span>{searchResult.name}<br /><div className="brandname">{searchResult.brand.name}</div></span>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <g clip-path="url(#clip0_1995_373)">
                                                            <path d="M15.1097 13.7383C15.1097 14.1526 15.4455 14.4883 15.8597 14.4883C16.2739 14.4883 16.6097 14.1526 16.6097 13.7383V8.08149C16.6097 7.87438 16.5257 7.68688 16.39 7.55115C16.3181 7.47925 16.2352 7.42499 16.1468 7.38839C16.0583 7.35172 15.9614 7.33149 15.8597 7.33148L10.2028 7.33148C9.78862 7.33148 9.45284 7.66727 9.45284 8.08148C9.45284 8.4957 9.78862 8.83148 10.2028 8.83148L14.049 8.83148L7.19763 15.6829C6.90474 15.9758 6.90474 16.4506 7.19763 16.7435C7.49053 17.0364 7.9654 17.0364 8.25829 16.7435L15.1097 9.89215L15.1097 13.7383Z" fill="black" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_1995_373">
                                                                <rect width="24" height="24" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </Link>
                                            </li>
                                        ))
                                        : <li>
                                            <div className="search_suggestion">
                                                <div className="flex_pair">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.385 15.4458C11.7348 17.5685 7.85532 17.4014 5.39854 14.9446C2.7625 12.3086 2.7625 8.0347 5.39854 5.39866C8.03458 2.76262 12.3084 2.76262 14.9445 5.39866C17.4013 7.85544 17.5683 11.7349 15.4457 14.3851L20.6013 19.5408C20.8942 19.8337 20.8942 20.3085 20.6013 20.6014C20.3084 20.8943 19.8335 20.8943 19.5407 20.6014L14.385 15.4458ZM6.4592 13.8839C4.40895 11.8337 4.40895 8.50957 6.4592 6.45932C8.50945 4.40907 11.8336 4.40907 13.8838 6.45932C15.9326 8.50807 15.9341 11.8288 13.8883 13.8794C13.8868 13.8809 13.8853 13.8824 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9342 8.50795 15.9327 6.4592 13.8839Z" fill="black" />
                                                    </svg>
                                                    <span>No results</span>
                                                </div>
                                            </div>
                                        </li>
                                }
                            </ul>
                        }
                    </div>
                    <button className="open_search_btn" href="" onClick={() => setSearchActive(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.385 15.4458C11.7348 17.5685 7.85532 17.4014 5.39854 14.9446C2.7625 12.3086 2.7625 8.0347 5.39854 5.39866C8.03458 2.76262 12.3084 2.76262 14.9445 5.39866C17.4013 7.85544 17.5683 11.7349 15.4457 14.3851L20.6013 19.5408C20.8942 19.8337 20.8942 20.3085 20.6013 20.6014C20.3084 20.8943 19.8335 20.8943 19.5407 20.6014L14.385 15.4458ZM6.4592 13.8839C4.40895 11.8337 4.40895 8.50957 6.4592 6.45932C8.50945 4.40907 11.8336 4.40907 13.8838 6.45932C15.9326 8.50807 15.9341 11.8288 13.8883 13.8794C13.8868 13.8809 13.8853 13.8824 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9342 8.50795 15.9327 6.4592 13.8839Z" fill="black" />
                        </svg>
                    </button>
                    {isAuthenticated &&
                        <Link to="/shopping_cart" className="open_cart_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.1477 5.25H5.33514L4.15497 3.1346C4.0225 2.89715 3.7719 2.75 3.5 2.75H2C1.58579 2.75 1.25 3.08579 1.25 3.5C1.25 3.91421 1.58579 4.25 2 4.25H3.0596L4.22429 6.33765L6.91037 12.2809L6.91312 12.2869L7.14971 12.8104L4.45287 15.687C4.25895 15.8939 4.19825 16.1924 4.29599 16.4585C4.39372 16.7247 4.63317 16.913 4.91486 16.9452L7.37299 17.2261C10.4477 17.5775 13.5524 17.5775 16.627 17.2261L19.0852 16.9452C19.4967 16.8981 19.7922 16.5264 19.7452 16.1148C19.6981 15.7033 19.3264 15.4078 18.9149 15.4549L16.4567 15.7358C13.4952 16.0742 10.5048 16.0742 7.54331 15.7358L6.56779 15.6243L8.54717 13.513C8.56632 13.4925 8.5841 13.4713 8.60052 13.4494L9.35334 13.5474C10.4083 13.6847 11.4746 13.7116 12.5351 13.6277C15.0086 13.4321 17.301 12.2551 18.9015 10.3591L19.4795 9.67425C19.499 9.65125 19.517 9.62711 19.5335 9.60194L20.6109 7.96009C21.3745 6.79633 20.5397 5.25 19.1477 5.25ZM8.65627 11.944C8.49086 11.9225 8.34823 11.8175 8.27858 11.666L8.27725 11.6631L6.05674 6.75H19.1477C19.3466 6.75 19.4658 6.9709 19.3567 7.13716L18.3042 8.74123L17.7552 9.39152C16.4132 10.9814 14.4909 11.9683 12.4169 12.1324C11.4603 12.208 10.4984 12.1837 9.54688 12.0599L8.65627 11.944Z" fill="black" />
                                <path d="M6.5 18.5C5.67157 18.5 5 19.1716 5 20C5 20.8284 5.67157 21.5 6.5 21.5C7.32843 21.5 8 20.8284 8 20C8 19.1716 7.32843 18.5 6.5 18.5Z" fill="black" />
                                <path d="M16 20C16 19.1716 16.6716 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5C16.6716 21.5 16 20.8284 16 20Z" fill="black" />
                            </svg>
                            <span className="cart_count">{cartCount}</span>
                        </Link>
                    }
                    {!isAuthenticated
                        ? <Link to="/login" className="login_btn">
                            Login / Register
                        </Link>
                        : <a className="auth_cred" onClick={toggleAuthNavDropdown} ref={authNavDropdownRef}>
                            <span className="auth_username">{user.first_name} {user.last_name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="black" />
                            </svg>
                            {
                                authNavDropdown
                                    ? <ul className="auth_nav_dropdown">
                                        <li>
                                            <Link to="/orders" className="auth_nav_link">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.25002 7.25V7.13012C7.25002 4.96238 8.71763 3.06964 10.8171 2.52979C11.5931 2.33024 12.407 2.33024 13.183 2.52979C15.2824 3.06964 16.75 4.96238 16.75 7.13013V7.25H18.2511C18.8224 7.25 19.3073 7.66898 19.3901 8.23423L19.6088 9.72668C20.0393 12.6651 20.0393 15.6507 19.6088 18.5891C19.4008 20.0081 18.2565 21.1052 16.83 21.2531L16.2011 21.3183C13.4079 21.608 10.5921 21.608 7.79888 21.3183L7.17001 21.2531C5.74347 21.1052 4.59918 20.0081 4.39127 18.5891C3.96072 15.6507 3.96072 12.6651 4.39127 9.72668L4.60994 8.23423C4.69276 7.66898 5.17761 7.25 5.74889 7.25H7.25002ZM11.1906 3.98252C11.7216 3.84599 12.2784 3.84599 12.8094 3.98252C14.2459 4.3519 15.25 5.64693 15.25 7.13013V7.25H8.75002V7.13012C8.75002 5.64693 9.75417 4.3519 11.1906 3.98252ZM7.25002 8.75V11C7.25002 11.4142 7.5858 11.75 8.00002 11.75C8.41423 11.75 8.75002 11.4142 8.75002 11V8.75H15.25V11C15.25 11.4142 15.5858 11.75 16 11.75C16.4142 11.75 16.75 11.4142 16.75 11V8.75H17.9496L18.1246 9.94414C18.534 12.7384 18.534 15.5774 18.1246 18.3717C18.0162 19.1118 17.4193 19.684 16.6753 19.7611L16.0464 19.8264C13.356 20.1054 10.644 20.1054 7.95361 19.8264L7.32474 19.7611C6.5807 19.684 5.98386 19.1118 5.87542 18.3717C5.46601 15.5774 5.46601 12.7384 5.87542 9.94414L6.05039 8.75H7.25002Z" fill="black" />
                                                </svg>
                                                <span>Orders</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/wishlist" className="auth_nav_link">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.25 10.0298C3.25 7.3293 5.61914 5.25 8.4 5.25C9.83347 5.25 11.0948 5.92214 12 6.79183C12.9052 5.92214 14.1665 5.25 15.6 5.25C18.3809 5.25 20.75 7.3293 20.75 10.0298C20.75 11.8797 19.9611 13.5064 18.8682 14.8815C17.7771 16.2543 16.35 17.4193 14.9835 18.366C14.4615 18.7276 13.9335 19.0611 13.4503 19.3072C12.9965 19.5383 12.4747 19.75 12 19.75C11.5253 19.75 11.0035 19.5383 10.5497 19.3072C10.0665 19.0611 9.53846 18.7276 9.01653 18.366C7.65005 17.4193 6.22287 16.2543 5.13182 14.8815C4.03888 13.5064 3.25 11.8797 3.25 10.0298ZM8.4 6.75C6.32075 6.75 4.75 8.2791 4.75 10.0298C4.75 11.4333 5.34579 12.74 6.30609 13.9482C7.26828 15.1588 8.56292 16.2269 9.87074 17.133C10.3656 17.4758 10.8317 17.7675 11.2305 17.9706C11.6586 18.1886 11.9067 18.25 12 18.25C12.0933 18.25 12.3414 18.1886 12.7695 17.9706C13.1683 17.7675 13.6344 17.4758 14.1293 17.133C15.4371 16.2269 16.7317 15.1588 17.6939 13.9482C18.6542 12.74 19.25 11.4333 19.25 10.0298C19.25 8.2791 17.6792 6.75 15.6 6.75C14.4058 6.75 13.2908 7.46342 12.5946 8.36892C12.4526 8.55356 12.2329 8.66176 12 8.66176C11.7671 8.66176 11.5474 8.55356 11.4054 8.36892C10.7092 7.46342 9.59415 6.75 8.4 6.75Z" fill="black" />
                                                </svg>
                                                <span>Wishlist</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/orders" className="auth_nav_link">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3.07922L9.78722 5.36872C9.55169 5.6124 9.22731 5.75002 8.8884 5.75002H5.75002V8.8884C5.75002 9.22731 5.6124 9.55169 5.36872 9.78722L3.07922 12L5.36872 14.2128C5.61241 14.4483 5.75002 14.7727 5.75002 15.1116V18.25H8.8884C9.22731 18.25 9.55169 18.3876 9.78721 18.6313L12 20.9208L14.2128 18.6313C14.4483 18.3876 14.7727 18.25 15.1116 18.25H18.25V15.1116C18.25 14.7727 18.3876 14.4483 18.6313 14.2128L20.9208 12L18.6313 9.78722C18.3876 9.5517 18.25 9.22732 18.25 8.88841V5.75002H15.1116C14.7727 5.75002 14.4483 5.61241 14.2128 5.36872L12 3.07922ZM11.1012 1.85078C11.5926 1.34238 12.4075 1.34238 12.8988 1.85078L15.2177 4.25002H18.5C19.1904 4.25002 19.75 4.80966 19.75 5.50002V8.78235L22.1493 11.1012C22.6576 11.5926 22.6577 12.4075 22.1493 12.8988L19.75 15.2177V18.5C19.75 19.1904 19.1904 19.75 18.5 19.75H15.2177L12.8988 22.1492C12.4075 22.6576 11.5926 22.6576 11.1012 22.1492L8.78235 19.75H5.50002C4.80966 19.75 4.25002 19.1904 4.25002 18.5V15.2177L1.85078 12.8988C1.34238 12.4075 1.34238 11.5926 1.85078 11.1012L4.25002 8.78235V5.50002C4.25002 4.80966 4.80966 4.25002 5.50002 4.25002H8.78235L11.1012 1.85078Z" fill="black" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.25002 12C7.25002 9.37666 9.37666 7.25002 12 7.25002C14.6234 7.25002 16.75 9.37666 16.75 12C16.75 14.6234 14.6234 16.75 12 16.75C9.37666 16.75 7.25002 14.6234 7.25002 12ZM12 8.75002C10.2051 8.75002 8.75002 10.2051 8.75002 12C8.75002 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75002 12 8.75002Z" fill="black" />
                                                </svg>
                                                <span>Account Settings</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={handleLogout} className="auth_nav_link">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 18.25C11.5858 18.25 11.25 18.5858 11.25 19C11.25 19.4142 11.5858 19.75 12 19.75H18C18.9665 19.75 19.75 18.9665 19.75 18V6C19.75 5.0335 18.9665 4.25 18 4.25H12C11.5858 4.25 11.25 4.58579 11.25 5C11.25 5.41421 11.5858 5.75 12 5.75L18 5.75C18.1381 5.75 18.25 5.86193 18.25 6L18.25 18C18.25 18.1381 18.1381 18.25 18 18.25H12Z" fill="black" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5031 14.3652C15.1934 14.3652 15.7531 13.8056 15.7531 13.1152V10.8747C15.7531 10.1843 15.1934 9.6247 14.5031 9.6247L9.89048 9.6247C9.88396 9.55128 9.87713 9.47787 9.87 9.40448L9.81597 8.8486C9.73354 8.00049 8.83294 7.49258 8.06451 7.86084C6.43029 8.64403 4.95085 9.71578 3.69736 11.0245L3.59816 11.1281C3.13395 11.6128 3.13395 12.3771 3.59815 12.8618L3.69736 12.9654C4.95085 14.2741 6.43029 15.3459 8.06451 16.1291C8.83293 16.4973 9.73354 15.9894 9.81597 15.1413L9.87 14.5854C9.87713 14.512 9.88396 14.4386 9.89048 14.3652H14.5031ZM9.19511 12.8652C8.92874 12.8652 8.69326 13.0045 8.56008 13.216C8.49523 13.319 8.45464 13.4391 8.44656 13.5685C8.42842 13.8594 8.40524 14.15 8.37703 14.4403L8.36135 14.6017C7.3253 14.0677 6.36316 13.4028 5.49838 12.6239C5.27402 12.4218 5.05622 12.2121 4.84538 11.995C5.86892 10.9409 7.05651 10.0607 8.36135 9.38824L8.37703 9.54959C8.40524 9.83987 8.42842 10.1305 8.44656 10.4214C8.47122 10.8167 8.79902 11.1247 9.19511 11.1247H14.2531V12.8652H9.19511Z" fill="black" />
                                                </svg>
                                                <span>Logout</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    : null
                            }

                        </a>
                    }
                </nav>
            </header>
            {
                sideNav && <SideNav sideNav={sideNav} setSideNav={setSideNav} />
            }
        </>
    );
}

export default Header;
