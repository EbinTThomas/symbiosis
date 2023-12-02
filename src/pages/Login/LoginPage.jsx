import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
// import '../../static/styles/LoginPage.css';
import { Link, resolvePath, useLocation, useNavigate } from 'react-router-dom';
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

const LOGIN_URL = '/api/account/login/';
const SIGNUP_URL = '/api/account/register/';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const usernameRef = useRef();

  const [signupFirstName, setSigupFirstName] = useState('');
  const [signupLastName, setSigupLastName] = useState('');
  const [signupEmail, setSigupEmail] = useState('');
  const [signupPassword, setSigupPassword] = useState('');

  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);

  const [loginErrMsg, setLoginErrMsg] = useState('');
  const [signupErrMsg, setSignupErrMsg] = useState('');
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');
  const [pageName, setPageName] = useState('signup');

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated]);

  const handleSignUp = async (e) => {
    e.preventDefault();
  
  
    try {
      const response = await axios.post(SIGNUP_URL, {
        first_name: signupFirstName,
        last_name: signupLastName,
        email: signupEmail,
        password: signupPassword,
      });
  
      setSignupSuccessMsg(response?.data?.message);
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response?.data));
      navigate('/verify_mail');
      console.log("Sign-up successful!");
    } catch (err) {
      console.log("Sign-up error: ", err);
      setSignupErrMsg(err?.response?.data?.error);
    } finally {
      // Clear form fields and reset loading state
      setSigupFirstName('');
      setSigupLastName('');
      setSigupEmail('');
      setSigupPassword('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, {
        email: loginEmail,
        password: loginPassword,
      });
      const token = response?.data?.token;
      const user = response?.data?.user;
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(user));
      console.log(JSON.stringify(user))
      setLoginEmail('');
      setLoginPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setLoginErrMsg('No server response');
      } else if (err?.response?.status === 400) {
        setLoginErrMsg('Missing Username or Password');
      } else if (err?.response?.status === 401) {
        setLoginErrMsg('Invalid Username or Password');
      } else {
        setLoginErrMsg('Login Failed');
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
            {signupErrMsg && <div className="alert alert-danger">{signupErrMsg}</div>}
            {signupSuccessMsg && <div className="success">{signupSuccessMsg}</div>}
            <div className="form_fields">
              <CustomCssTextField label="First Name" variant="outlined" type="text" className="form_field" onChange={(e) => setSigupFirstName(e.target.value)} />
              <CustomCssTextField label="Last Name" variant="outlined" type="text" className="form_field" onChange={(e) => setSigupLastName(e.target.value)} />
              <CustomCssTextField label="Email" variant="outlined" type="email" className="form_field" onChange={(e) => setSigupEmail(e.target.value)} />
              <CustomCssTextField label="Password" variant="outlined" type="password" className="form_field" onChange={(e) => setSigupPassword(e.target.value)} />
              <button className="submit_btn" onClick={handleSignUp}>Sign Up</button>
            </div>
          </form>
        </div>
        <div className={`form-container sign-in-container ${pageName}`}>
          <form action="#">
            <h1>Sign in</h1>
            <span>Enter your login details</span>
            {loginErrMsg ? (
              <div className="alert alert-danger">{loginErrMsg}</div>
            ) : (
              ''
            )}
            <div className="form_fields">
              <CustomCssTextField label="Email" variant="outlined" type="email" className="form_field" onChange={(e) => setLoginEmail(e.target.value)} />
              <CustomCssTextField label="Password" variant="outlined" type="password" className="form_field" onChange={(e) => setLoginPassword(e.target.value)} />
              <Link to="/password_reset/request" className="forgot_password">Forgot your password?</Link>
              <button className="submit_btn" onClick={handleLogin}>Sign In</button>
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
