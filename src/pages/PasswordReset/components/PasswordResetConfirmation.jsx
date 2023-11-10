import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const RESET_PASSWORD_URL = '/api/account/password-reset/'

function PasswordResetConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search)

    const reset_token = queryParams.get('reset_token');

    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const handleChangePassword = async () => {
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
                navigate('/login', {replace: true})
            } else {
                console.log('passwords don\'t match');
            }
        } catch (error) {

        }
    }

    return (
        <section className="section_content">
            <div className="password_reset_form_container">
                <div className="password_reset_form">
                    <div className="heading_container">
                        <h1>Set New Password</h1>
                        <p>Enter new password to continue</p>
                    </div>
                    <input type="password" className="password_reset_email_input" placeholder="Password" onChange={(e) => setNewPassword1(e.target.value)} required />
                    <input type="password" className="password_reset_email_input" placeholder="Confirm Password" onChange={(e) => setNewPassword2(e.target.value)} required />
                    <div className="send_reset_email_btn_container">
                        <button className="send_reset_email_btn" onClick={handleChangePassword}>
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PasswordResetConfirmation