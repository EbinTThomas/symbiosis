import React, { useState, useRef, useEffect } from 'react';

const OTPField = ({otp, setOtp}) => {
    const inputRefs = useRef([]);

    const handleInputChange = (index, event) => {
        const value = event.target.value;

        // Allow only numeric input
        if (/^[0-9]*$/.test(value) && value.length <= 1) {
            const newOtpValues = [...otp];
            newOtpValues[index] = value;

            setOtp(newOtpValues);

            // Move to the next input field if a digit is entered
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (index, event) => {
        // Move to the previous input field on backspace if the current field is empty
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        // Focus on the first input when the component is loaded
        inputRefs.current[0].focus();
    }, []);

    return (
        <div>
            <div className="otp_field_wrapper">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        maxLength="1"
                        value={value}
                        onChange={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleBackspace(index, e)}
                        className="otp_field"
                    />
                ))}
            </div>
        </div>
    );
};

export default OTPField;
