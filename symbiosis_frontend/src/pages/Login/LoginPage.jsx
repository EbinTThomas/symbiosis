import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import '../../static/styles/LoginPage.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CustomCssTextField from '../Common/CustomCssTextField';

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
  const [pageName, setPageName] = useState('signin');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
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
  const handlePageChange = () => {
    setPageName(pageName === 'signin' ? 'signup' : 'signin');
  };

  return (
    <main className="login_container" id="login_container">
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
      <div className={`form_containers ${pageName}`}>
        <div className={`form-container sign-up-container ${pageName}`}>
          <form action="#">
            <h1>Create New Account</h1>
            <span>Enter your details to continue</span>
            {errMsg ? (
              <div className="alert alert-danger">{errMsg}</div>
            ) : (
              ''
            )}
            <div className="form_fields">
              <CustomCssTextField label="Name" variant="outlined" type="text" className="form_field" />
              <CustomCssTextField label="Email" variant="outlined" type="email" className="form_field" />
              <CustomCssTextField label="Password" variant="outlined" type="password" className="form_field" />
              <button className="submit_btn">Sign Up</button>
            </div>
          </form>
        </div>
        <div className={`form-container sign-in-container ${pageName}`}>
          <form action="#">
            <h1>Sign in</h1>
            <span>Enter your login details</span>
            <div className="form_fields">
              <CustomCssTextField label="Email" variant="outlined" type="email" className="form_field" />
              <CustomCssTextField label="Password" variant="outlined" type="password" className="form_field" />
              <Link to="#" className="forgot_password">Forgot your password?</Link>
              <button className="submit_btn" onClick={handleSubmit}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`overlay-container ${pageName}`}>
        <div className={`overlay ${pageName}`}>
          <div className="overlay-panel overlay-left">
            <button className="shift_btn" id="signIn" onClick={handlePageChange}>
              Sign Up
            </button>
            <h1>Don't have account!</h1>
            <p>Join here</p>
          </div>
          <div className="overlay-panel overlay-right">
            <button className="shift_btn" id="signUp" onClick={handlePageChange}>
              Sign In
            </button>
            <h1>Already have an account!</h1>
            <p>Login here</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
