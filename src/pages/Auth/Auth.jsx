import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../../static/styles/Auth.css'
import InputField from './components/InputField';
import axios from '../../api/axios';
import OTPField from './components/OTPField';
import { Helmet } from 'react-helmet-async';

const LOGIN_URL = '/api/account/login/';
const SIGNUP_URL = '/api/account/register/';
const VERIFY_EMAIL = '/api/account/verify-email/';
const CONFIRM_EMAIL_URL = '/api/account/password-reset-request/';
const RESET_PASSWORD_URL = '/api/account/password-reset/';

function Auth() {
    const slides = [
        {
            "id": 1,
            "image": "https://cdn.dribbble.com/userupload/7837926/file/original-bf485f50c18158099dfd2acb3bee7f96.png?resize=1200x800",
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

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleInputChange = (e) => {
        e.target.name === 'email'
            ? setEmail(e.target.value)
            : e.target.name === 'password'
                ? setPassword(e.target.value)
                : e.target.name === 'confirm_password'
                && setConfirmPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, {
                email: email,
                password: password,
            });
            const token = response?.data?.token;
            const user = response?.data?.user;
            localStorage.setItem('token', token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('user', JSON.stringify(user));
            handleResetStates();
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else {
                setErrMsg(err.message);
            }
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(SIGNUP_URL, {
                email: email,
                password: password,
            });
            localStorage.setItem('user', JSON.stringify(response?.data));
            handleResetStates();
            navigate('/auth/verify_mail');
        } catch (err) {
            setErrMsg(err.message);
        }
    };

    const handleResetStates = () => {
        setConfirmPassword('');
        setErrMsg('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/

    const handleVerifyEmail = (e) => {
        e.preventDefault();
        const auth_token = JSON.parse(localStorage.getItem('user')).auth_token;
        const otpString = otp.join('');
        console.log(auth_token);

        axios.post(
            VERIFY_EMAIL,
            {
                otp: otpString,
                auth_token: auth_token,
            }
        ).then((res) => {
            console.log(res.data);
            navigate('/auth/verified');
        }).catch((err) => {
            setErrMsg(err.message);
        });
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                CONFIRM_EMAIL_URL,
                {
                    'email': email
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            navigate('/auth/password_reset/email', { replace: true });
        } catch (err) {
            setErrMsg(err.message)
        }
    }

    const queryParams = new URLSearchParams(location.search)

    const reset_token = queryParams.get('reset_token');

    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            if (newPassword1 === newPassword2) {
                const response = await axios.post(
                    `${RESET_PASSWORD_URL}${reset_token}/`,
                    {
                        'password': newPassword1
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                navigate('/auth/password_reset/success', { replace: true })
            } else {
                setErrMsg("Passwords don't match!");
            }

        } catch (err) {
            setErrMsg(err.message);
        }
    }

    useEffect(() => {
        handleResetStates();
    }, [location.pathname]);

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <section id="section_auth">
                <div className="flex_box">
                    <div className="flex_item">
                        <div className="auth_form_container">
                            <img src="/assets/img/logo.png" alt="" className="auth_form_logo" />
                            {
                                location.pathname === '/auth/login'
                                    ? <form onSubmit={(e) => handleLogin(e)} className="auth_form">
                                        <center className="auth_form_title_wrap">
                                            <h1>Welcome Back</h1>
                                            <p>Welcome back, Please enter your details</p>
                                        </center>
                                        <div className="auth_switch_container">
                                            <a className="auth_switch active">Login</a>
                                            <a className="auth_switch" onClick={() => navigate("/auth/signup")}>Signup</a>
                                        </div>
                                        {
                                            errMsg !== ''
                                            && <div className="err_msg_alert">
                                                {errMsg}
                                            </div>
                                        }
                                        <div className="input_fields">
                                            <InputField label="Email Address" fieldName="email" isValid={emailRegex.test(email)} type="text" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.80366 8.3533C2.52352 10.9562 2.53601 13.9582 2.92583 16.5505C3.14153 17.9849 4.3122 19.0845 5.75727 19.2102L7.2675 19.3414C10.4165 19.6152 13.5834 19.6152 16.7325 19.3414L18.2427 19.2102C19.6878 19.0845 20.8584 17.9849 21.0741 16.5505C21.4639 13.9582 21.4765 10.9564 21.1963 8.35345C21.1601 8.05169 21.1194 7.75034 21.0741 7.44949C20.8584 6.0151 19.6878 4.91545 18.2427 4.78983L16.7325 4.65855C13.5834 4.38481 10.4165 4.38481 7.2675 4.65855L5.75727 4.78983C4.3122 4.91545 3.14153 6.0151 2.92583 7.44949C2.8806 7.75028 2.83988 8.05159 2.80366 8.3533ZM7.3974 6.15292C10.46 5.88669 13.5399 5.88669 16.6025 6.15292L18.1128 6.2842C18.8671 6.34977 19.4782 6.92379 19.5908 7.67254C19.6025 7.7503 19.6139 7.82809 19.6249 7.90592L14.0639 10.9954C12.7803 11.7085 11.2196 11.7085 9.93596 10.9954L4.37502 7.90596C4.38608 7.82812 4.39746 7.75031 4.40915 7.67254C4.52175 6.92379 5.13284 6.34977 5.88717 6.2842L7.3974 6.15292ZM19.8085 9.51989C20.0025 11.7876 19.9299 14.0725 19.5908 16.3274C19.4782 17.0762 18.8671 17.6502 18.1128 17.7158L16.6026 17.8471C13.5399 18.1133 10.46 18.1133 7.3974 17.8471L5.88717 17.7158C5.13284 17.6502 4.52175 17.0762 4.40915 16.3274C4.07006 14.0725 3.9975 11.7877 4.19147 9.51992L9.20749 12.3066C10.9441 13.2714 13.0558 13.2714 14.7924 12.3066L19.8085 9.51989Z" fill="black" /></svg>} />
                                            <InputField label="Password" fieldName="password" isValid={passwordRegex.test(password)} type="password" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.5001 16C10.5001 15.1716 11.1716 14.5 12.0001 14.5C12.8285 14.5 13.5001 15.1716 13.5001 16C13.5001 16.8284 12.8285 17.5 12.0001 17.5C11.1716 17.5 10.5001 16.8284 10.5001 16Z" fill="black" /><path fillRule="evenodd" clipRule="evenodd" d="M7.62171 10.5971L7.30627 7.75816C7.26583 7.39418 7.26583 7.02684 7.30627 6.66286L7.32904 6.45796C7.57053 4.28457 9.27913 2.56492 11.4509 2.30941C11.8157 2.26649 12.1843 2.26649 12.5492 2.30941C14.7209 2.56492 16.4295 4.28458 16.671 6.45797L16.6938 6.66286C16.7342 7.02684 16.7342 7.39418 16.6938 7.75815L16.3784 10.5971L17.065 10.6519C18.1477 10.7384 19.0318 11.5523 19.2073 12.6242C19.5734 14.8598 19.5734 17.1401 19.2073 19.3758C19.0318 20.4477 18.1477 21.2616 17.065 21.348L15.5688 21.4675C13.1935 21.6571 10.8067 21.6571 8.43134 21.4675L6.93521 21.348C5.85249 21.2616 4.96838 20.4477 4.79286 19.3758C4.42679 17.1401 4.42679 14.8598 4.79286 12.6242C4.96838 11.5523 5.85248 10.7384 6.93521 10.6519L7.62171 10.5971ZM11.6262 3.79914C11.8746 3.76992 12.1255 3.76992 12.3739 3.79914C13.8525 3.97309 15.0158 5.1439 15.1802 6.62361L15.203 6.82851C15.2312 7.08239 15.2312 7.33862 15.203 7.59251L14.8818 10.483C12.9626 10.3594 11.0375 10.3594 9.11826 10.483L8.7971 7.59251C8.76889 7.33862 8.76889 7.08239 8.7971 6.82851L8.81986 6.62361C8.98428 5.1439 10.1475 3.97309 11.6262 3.79914ZM15.4495 12.0277C13.1535 11.8445 10.8466 11.8445 8.55071 12.0277L7.05458 12.1472C6.65965 12.1787 6.33717 12.4756 6.27315 12.8666C5.93336 14.9417 5.93336 17.0583 6.27315 19.1334C6.33717 19.5244 6.65965 19.8213 7.05458 19.8528L8.55071 19.9722C10.8466 20.1555 13.1535 20.1555 15.4495 19.9722L16.9456 19.8528C17.3405 19.8213 17.663 19.5244 17.727 19.1334C18.0668 17.0583 18.0668 14.9417 17.727 12.8666C17.663 12.4756 17.3405 12.1787 16.9456 12.1472L15.4495 12.0277Z" fill="black" /></svg>} />
                                            <Link className="forgot_password" to="/auth/password_reset/request">Forgot Password?</Link>
                                        </div>
                                        <button className="btn_login" type="submit" disabled={!emailRegex.test(email) || !passwordRegex.test(password)}>Login</button>
                                    </form>
                                    : location.pathname === '/auth/signup'
                                        ? <form onSubmit={(e) => handleSignUp(e)} className="auth_form">
                                            <center className="auth_form_title_wrap">
                                                <h1>Welcome to Symbiosis</h1>
                                                <p>Enter your details to create new account</p>
                                            </center>
                                            <div className="auth_switch_container">
                                                <a className="auth_switch" onClick={() => navigate("/auth/login")}>Login</a>
                                                <a className="auth_switch active">Signup</a>
                                            </div>
                                            {
                                                errMsg !== ''
                                                && <div className="err_msg_alert">
                                                    {errMsg}
                                                </div>
                                            }
                                            <div className="input_fields">
                                                <InputField label="Email Address" fieldName="email" isValid={emailRegex.test(email)} type="text" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.80366 8.3533C2.52352 10.9562 2.53601 13.9582 2.92583 16.5505C3.14153 17.9849 4.3122 19.0845 5.75727 19.2102L7.2675 19.3414C10.4165 19.6152 13.5834 19.6152 16.7325 19.3414L18.2427 19.2102C19.6878 19.0845 20.8584 17.9849 21.0741 16.5505C21.4639 13.9582 21.4765 10.9564 21.1963 8.35345C21.1601 8.05169 21.1194 7.75034 21.0741 7.44949C20.8584 6.0151 19.6878 4.91545 18.2427 4.78983L16.7325 4.65855C13.5834 4.38481 10.4165 4.38481 7.2675 4.65855L5.75727 4.78983C4.3122 4.91545 3.14153 6.0151 2.92583 7.44949C2.8806 7.75028 2.83988 8.05159 2.80366 8.3533ZM7.3974 6.15292C10.46 5.88669 13.5399 5.88669 16.6025 6.15292L18.1128 6.2842C18.8671 6.34977 19.4782 6.92379 19.5908 7.67254C19.6025 7.7503 19.6139 7.82809 19.6249 7.90592L14.0639 10.9954C12.7803 11.7085 11.2196 11.7085 9.93596 10.9954L4.37502 7.90596C4.38608 7.82812 4.39746 7.75031 4.40915 7.67254C4.52175 6.92379 5.13284 6.34977 5.88717 6.2842L7.3974 6.15292ZM19.8085 9.51989C20.0025 11.7876 19.9299 14.0725 19.5908 16.3274C19.4782 17.0762 18.8671 17.6502 18.1128 17.7158L16.6026 17.8471C13.5399 18.1133 10.46 18.1133 7.3974 17.8471L5.88717 17.7158C5.13284 17.6502 4.52175 17.0762 4.40915 16.3274C4.07006 14.0725 3.9975 11.7877 4.19147 9.51992L9.20749 12.3066C10.9441 13.2714 13.0558 13.2714 14.7924 12.3066L19.8085 9.51989Z" fill="black" /></svg>} />
                                                <InputField label="Password" fieldName="password" isValid={passwordRegex.test(password)} type="password" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.5001 16C10.5001 15.1716 11.1716 14.5 12.0001 14.5C12.8285 14.5 13.5001 15.1716 13.5001 16C13.5001 16.8284 12.8285 17.5 12.0001 17.5C11.1716 17.5 10.5001 16.8284 10.5001 16Z" fill="black" /><path fillRule="evenodd" clipRule="evenodd" d="M7.62171 10.5971L7.30627 7.75816C7.26583 7.39418 7.26583 7.02684 7.30627 6.66286L7.32904 6.45796C7.57053 4.28457 9.27913 2.56492 11.4509 2.30941C11.8157 2.26649 12.1843 2.26649 12.5492 2.30941C14.7209 2.56492 16.4295 4.28458 16.671 6.45797L16.6938 6.66286C16.7342 7.02684 16.7342 7.39418 16.6938 7.75815L16.3784 10.5971L17.065 10.6519C18.1477 10.7384 19.0318 11.5523 19.2073 12.6242C19.5734 14.8598 19.5734 17.1401 19.2073 19.3758C19.0318 20.4477 18.1477 21.2616 17.065 21.348L15.5688 21.4675C13.1935 21.6571 10.8067 21.6571 8.43134 21.4675L6.93521 21.348C5.85249 21.2616 4.96838 20.4477 4.79286 19.3758C4.42679 17.1401 4.42679 14.8598 4.79286 12.6242C4.96838 11.5523 5.85248 10.7384 6.93521 10.6519L7.62171 10.5971ZM11.6262 3.79914C11.8746 3.76992 12.1255 3.76992 12.3739 3.79914C13.8525 3.97309 15.0158 5.1439 15.1802 6.62361L15.203 6.82851C15.2312 7.08239 15.2312 7.33862 15.203 7.59251L14.8818 10.483C12.9626 10.3594 11.0375 10.3594 9.11826 10.483L8.7971 7.59251C8.76889 7.33862 8.76889 7.08239 8.7971 6.82851L8.81986 6.62361C8.98428 5.1439 10.1475 3.97309 11.6262 3.79914ZM15.4495 12.0277C13.1535 11.8445 10.8466 11.8445 8.55071 12.0277L7.05458 12.1472C6.65965 12.1787 6.33717 12.4756 6.27315 12.8666C5.93336 14.9417 5.93336 17.0583 6.27315 19.1334C6.33717 19.5244 6.65965 19.8213 7.05458 19.8528L8.55071 19.9722C10.8466 20.1555 13.1535 20.1555 15.4495 19.9722L16.9456 19.8528C17.3405 19.8213 17.663 19.5244 17.727 19.1334C18.0668 17.0583 18.0668 14.9417 17.727 12.8666C17.663 12.4756 17.3405 12.1787 16.9456 12.1472L15.4495 12.0277Z" fill="black" /></svg>} />
                                                <InputField label="Confirm Password" fieldName="confirm_password" isValid={passwordRegex.test(password) && password === confirmPassword} type="password" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="black" /></svg>} />
                                            </div>
                                            <button className="btn_login" type="submit" disabled={!emailRegex.test(email) || !passwordRegex.test(password) || password !== confirmPassword}>Create Account</button>
                                        </form>
                                        : location.pathname === '/auth/verify_mail'
                                            ? <form onSubmit={(e) => handleVerifyEmail(e)} className="auth_form">
                                                <center className="auth_form_title_wrap">
                                                    <h1>Email Confirmation</h1>
                                                    <p>A One-Time Password (OTP) has been dispatched to your email. Please input the provided OTP to complete the account creation process.</p>
                                                </center>
                                                {
                                                    errMsg !== ''
                                                    && <div className="err_msg_alert">
                                                        {errMsg}
                                                    </div>
                                                }
                                                <div className="input_fields">
                                                    <OTPField setOtp={setOtp} otp={otp} />
                                                </div>
                                                <button className="btn_login" type="submit" disabled={otp.every(value => value !== '') ? false : true}>
                                                    Verify OTP
                                                </button>
                                            </form>
                                            : location.pathname === '/auth/verified'
                                                ? <div className="auth_verified">
                                                    <h1>Email Verified</h1>
                                                    <p>Your email has been verified successfully</p>
                                                    <div className="btn_container">
                                                        <Link className="btn_primary" to="/auth/login">Login</Link>
                                                        <Link className="btn_outline" to="/">Home</Link>
                                                    </div>
                                                </div>
                                                : location.pathname === '/auth/password_reset/request'
                                                    ? <form onSubmit={(e) => handleSendEmail(e)} className="auth_form">
                                                        <center className="auth_form_title_wrap">
                                                            <h1>Password Reset Email</h1>
                                                            <p>Enter the email address associated with your account</p>
                                                        </center>
                                                        {
                                                            errMsg !== ''
                                                            && <div className="err_msg_alert">
                                                                {errMsg}
                                                            </div>
                                                        }
                                                        <div className="input_fields">
                                                            <InputField label="Email Address" fieldName="email" isValid={emailRegex.test(email)} type="text" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.80366 8.3533C2.52352 10.9562 2.53601 13.9582 2.92583 16.5505C3.14153 17.9849 4.3122 19.0845 5.75727 19.2102L7.2675 19.3414C10.4165 19.6152 13.5834 19.6152 16.7325 19.3414L18.2427 19.2102C19.6878 19.0845 20.8584 17.9849 21.0741 16.5505C21.4639 13.9582 21.4765 10.9564 21.1963 8.35345C21.1601 8.05169 21.1194 7.75034 21.0741 7.44949C20.8584 6.0151 19.6878 4.91545 18.2427 4.78983L16.7325 4.65855C13.5834 4.38481 10.4165 4.38481 7.2675 4.65855L5.75727 4.78983C4.3122 4.91545 3.14153 6.0151 2.92583 7.44949C2.8806 7.75028 2.83988 8.05159 2.80366 8.3533ZM7.3974 6.15292C10.46 5.88669 13.5399 5.88669 16.6025 6.15292L18.1128 6.2842C18.8671 6.34977 19.4782 6.92379 19.5908 7.67254C19.6025 7.7503 19.6139 7.82809 19.6249 7.90592L14.0639 10.9954C12.7803 11.7085 11.2196 11.7085 9.93596 10.9954L4.37502 7.90596C4.38608 7.82812 4.39746 7.75031 4.40915 7.67254C4.52175 6.92379 5.13284 6.34977 5.88717 6.2842L7.3974 6.15292ZM19.8085 9.51989C20.0025 11.7876 19.9299 14.0725 19.5908 16.3274C19.4782 17.0762 18.8671 17.6502 18.1128 17.7158L16.6026 17.8471C13.5399 18.1133 10.46 18.1133 7.3974 17.8471L5.88717 17.7158C5.13284 17.6502 4.52175 17.0762 4.40915 16.3274C4.07006 14.0725 3.9975 11.7877 4.19147 9.51992L9.20749 12.3066C10.9441 13.2714 13.0558 13.2714 14.7924 12.3066L19.8085 9.51989Z" fill="black" /></svg>} />
                                                        </div>
                                                        <button className="btn_login" type="submit" disabled={!emailRegex.test(email)}>Send Reset Link</button>
                                                    </form>
                                                    : location.pathname === '/auth/password_reset/email'
                                                        ? <div className="auth_verified">
                                                            <h1>Password Reset<br />Email Sent!</h1>
                                                            <p>An email has been send to the email address that you have provided having the password reset link.</p>
                                                        </div>
                                                        : location.pathname = '/auth/password_reset/confirmation'
                                                            ? <form onSubmit={(e) => handleChangePassword(e)} className="auth_form">
                                                                <center className="auth_form_title_wrap">
                                                                    <h1>Set New Password</h1>
                                                                    <p>Enter new password to continue</p>
                                                                </center>
                                                                {
                                                                    errMsg !== ''
                                                                    && <div className="err_msg_alert">
                                                                        {errMsg}
                                                                    </div>
                                                                }
                                                                <div className="input_fields">
                                                                    <InputField label="New Password" fieldName="password" isValid={passwordRegex.test(password)} type="password" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10.5001 16C10.5001 15.1716 11.1716 14.5 12.0001 14.5C12.8285 14.5 13.5001 15.1716 13.5001 16C13.5001 16.8284 12.8285 17.5 12.0001 17.5C11.1716 17.5 10.5001 16.8284 10.5001 16Z" fill="black" /><path fillRule="evenodd" clipRule="evenodd" d="M7.62171 10.5971L7.30627 7.75816C7.26583 7.39418 7.26583 7.02684 7.30627 6.66286L7.32904 6.45796C7.57053 4.28457 9.27913 2.56492 11.4509 2.30941C11.8157 2.26649 12.1843 2.26649 12.5492 2.30941C14.7209 2.56492 16.4295 4.28458 16.671 6.45797L16.6938 6.66286C16.7342 7.02684 16.7342 7.39418 16.6938 7.75815L16.3784 10.5971L17.065 10.6519C18.1477 10.7384 19.0318 11.5523 19.2073 12.6242C19.5734 14.8598 19.5734 17.1401 19.2073 19.3758C19.0318 20.4477 18.1477 21.2616 17.065 21.348L15.5688 21.4675C13.1935 21.6571 10.8067 21.6571 8.43134 21.4675L6.93521 21.348C5.85249 21.2616 4.96838 20.4477 4.79286 19.3758C4.42679 17.1401 4.42679 14.8598 4.79286 12.6242C4.96838 11.5523 5.85248 10.7384 6.93521 10.6519L7.62171 10.5971ZM11.6262 3.79914C11.8746 3.76992 12.1255 3.76992 12.3739 3.79914C13.8525 3.97309 15.0158 5.1439 15.1802 6.62361L15.203 6.82851C15.2312 7.08239 15.2312 7.33862 15.203 7.59251L14.8818 10.483C12.9626 10.3594 11.0375 10.3594 9.11826 10.483L8.7971 7.59251C8.76889 7.33862 8.76889 7.08239 8.7971 6.82851L8.81986 6.62361C8.98428 5.1439 10.1475 3.97309 11.6262 3.79914ZM15.4495 12.0277C13.1535 11.8445 10.8466 11.8445 8.55071 12.0277L7.05458 12.1472C6.65965 12.1787 6.33717 12.4756 6.27315 12.8666C5.93336 14.9417 5.93336 17.0583 6.27315 19.1334C6.33717 19.5244 6.65965 19.8213 7.05458 19.8528L8.55071 19.9722C10.8466 20.1555 13.1535 20.1555 15.4495 19.9722L16.9456 19.8528C17.3405 19.8213 17.663 19.5244 17.727 19.1334C18.0668 17.0583 18.0668 14.9417 17.727 12.8666C17.663 12.4756 17.3405 12.1787 16.9456 12.1472L15.4495 12.0277Z" fill="black" /></svg>} />
                                                                    <InputField label="Confirm Password" fieldName="confirm_password" isValid={passwordRegex.test(password) && password === confirmPassword} type="password" handleInputChange={handleInputChange} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="black" /></svg>} />
                                                                </div>
                                                                <button className="btn_login" type="submit" disabled={!passwordRegex.test(password) || password !== confirmPassword}>Reset Password</button>
                                                            </form>
                                                            : location.pathname = '/auth/password_reset/success'
                                                            && <div className="auth_verified">
                                                                <h1>Password Reset Successful</h1>
                                                                <p>The new password has been successfully updated</p>
                                                                <div className="btn_container">
                                                                    <Link className="btn_primary" to="/auth/login">Login</Link>
                                                                    <Link className="btn_outline" to="/">Home</Link>
                                                                </div>
                                                            </div>
                            }
                            <div className="caption">
                                Login and continue the excitement! Discover, shop, and connect with us as you explore a world of endless possibilities.
                            </div>
                        </div>
                    </div>
                    <div className="flex_item">
                        <img src={slides[0].image} className="ad_image" alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Auth