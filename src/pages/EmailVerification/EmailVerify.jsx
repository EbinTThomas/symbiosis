import Header from '../Common/Header'
import '../../static/styles/PasswordReset.css'
import '../../static/styles/LoginPage.css'
import CustomCssTextField from '../Common/CustomCssTextField'
import React, { useState } from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function EmailVerifyOtp() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState(false)

    const verify_otp = () => {
        const auth_token = JSON.parse(localStorage.getItem('user')).auth_token
        console.log(auth_token)
        axios.post('/api/account/verify-email/', {
            otp: otp,
            auth_token: auth_token
        }, 
        ).then((res) => {
            console.log(res.data)
            navigate('/login')
        })
        .catch((err) => {
            setOtpError(true)
        })
    }

    return (
        <>
            {/* <Header /> */}

            <section className="section_content">
                <div className="password_reset_form_container">
                    <div className="password_reset_form">
                    {otpError ? (
              <div className="alert alert-danger">Invalid OTP</div>
            ) : (
              ''
            )}
                        <div className="heading_container">
                            <h1>Verify Email!</h1>
                            <CustomCssTextField label="Enter OTP" variant="outlined" type="text" className="form_field" onChange={(e) => setOtp(e.target.value)} />
                            <button className="submit_btn" onClick={verify_otp}>Sign In</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmailVerifyOtp