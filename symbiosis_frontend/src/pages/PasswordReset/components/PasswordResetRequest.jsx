import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';

const CONFIRM_EMAIL_URL = '/api/account/password-reset-request/'
function PasswordResetRequest() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSendEmail = async () => {
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
            navigate('/password_reset/email', {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="section_content">
            <div className="password_reset_form_container">
                <div className="password_reset_form">
                    <div className="heading_container">
                        <h1>Password Reset Email</h1>
                        <p>Enter your email address associated with the account</p>
                    </div>
                    <input type="email" className="password_reset_email_input" placeholder="user@example.com" onChange={(e) => setEmail(e.target.value)} required />
                    <div className="send_reset_email_btn_container">
                        <button className="send_reset_email_btn" onClick={handleSendEmail}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PasswordResetRequest