import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import '../../static/styles/LoginPage.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\x20-\x7E]{8,100}$/;

const LOGIN_URL = '/users/api/login/';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const usernameRef = useRef();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log('hlo')
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    usernameRef.current.focus();
  }, [isAuthenticated]);

  const handleEmailBlur = (event) => {
    setEmailTouched(true);
    setValidEmail(EMAIL_REGEX.test(email));
  };

  const handlePasswordBlur = (event) => {
    setEmailTouched(true);
    setValidPassword(PWD_REGEX.test(password));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });
      const token = response?.data?.token;
      const role = response?.data?.user.user.role;
      const userDetail = response?.data?.user;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userDetail', JSON.stringify(userDetail));
      localStorage.setItem('isAuthenticated', true);
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err?.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err?.response?.status === 401) {
        setErrMsg('Invalid Username or Password');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleCloseTab = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Event handler for "Sign Up" button click
  const handleSignUpClick = () => {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  };

  // Event handler for "Sign In" button click
  const handleSignInClick = () => {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  };

  return (
    <main className="container" id="container">
      <button href="index.html" className="back_btn" onClick={handleCloseTab}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z"
            fill="black"
          />
        </svg>
      </button>
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Register</h1>
          <span>Enter your information to continue</span>
          {errMsg ? (
            <div className="alert alert-danger">{errMsg}</div>
          ) : (
            ''
          )}
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <span>Enter your login details</span>
          <input
            type="email"
            id="email"
            ref={usernameRef}
            autoComplete="off"
            className="text-field"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleEmailBlur(e)}
            placeholder='Email'
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-field"
            onBlur={(e) => handlePasswordBlur(e)}
            placeholder='Password'
            required
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={handleShowPassword}
          >
            {password.length !== 0 ? (
              showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c-7 0-11 8-11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )
            ) : (
              ''
            )}
          </button>
          <a href="#">Forgot your password?</a>
          <button onClick={handleSubmit}>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue your thing.</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Not registered Yet!</h1>
            <p>Enter your details to join us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
