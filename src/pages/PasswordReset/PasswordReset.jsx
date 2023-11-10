import React from 'react'
import Header from '../Common/Header'
import '../../static/styles/PasswordReset.css'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordResetEmail from './components/PasswordResetEmail'
import PasswordResetConfirmation from './components/PasswordResetConfirmation'

function PasswordReset({ step }) {
    return (
        <>
            <Header />
            {
                step === 1
                    ? <PasswordResetRequest />
                    : step === 2
                        ? <PasswordResetEmail />
                        : step === 3
                            ? <PasswordResetConfirmation />
                            : null
            }
        </>
    )
}

export default PasswordReset