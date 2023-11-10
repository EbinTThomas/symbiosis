import React, { useState } from 'react'

function PasswordResetEmail() {
    return (
        <section className="section_content">
            <div className="password_reset_form_container">
                <div className="password_reset_form">
                    <div className="heading_container">
                        <h1>Password Reset Email Sent!</h1>
                        <p>An email has been send to the email address you have provied having the password reset link.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PasswordResetEmail