import React, { useState } from 'react';
import axios from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MuiPhoneNumber from 'mui-phone-number';

const ADD_ADDRESS_URL = '/api/address/'

function AddressForm({ handleToggleForm, deliveryAddress, addressFilled }) {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        fullName: deliveryAddress.full_name || '',
        phoneNumber: deliveryAddress.phone || '',
        pincode: deliveryAddress.pincode || '',
        city: deliveryAddress.city || '',
        state: deliveryAddress.state || '',
        locality: deliveryAddress.locality || '',
        flatOrBuilding: deliveryAddress.building || '',
        landmark: deliveryAddress.landmark || '',
    });

    const addAddress = async () => {
        try {
            const response = await axios.post(
                ADD_ADDRESS_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );
            // Reset the form after successful submission
            resetForm();
            handleToggleForm();
        } catch (error) {
            // Handle errors here
        }
    }

    const editAddress = async () => {
        try {
            const response = await axios.put(
                ADD_ADDRESS_URL,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );
            // Reset the form after successful submission
            resetForm();
            handleToggleForm();
        } catch (error) {
            // Handle errors here
        }
    }

    const handleInputChange = (e) => {
        try {
            if (e.target) {
                const { name, value } = e.target;
                setFormData({
                    ...formData,
                    [name]: value,
                })
            } else {
                setFormData({
                    ...formData,
                    ['phoneNumber']: e,
                })
            }
        }
        catch (err) {
            // Handle errors here
            console.error(err);
        }
    }

    const resetForm = () => {
        setFormData({
            full_name: '',
            phoneNumber: '',
            pincode: '',
            city: '',
            state: '',
            locality: '',
            flatOrBuilding: '',
            landmark: '',
        });
    }

    return (
        <div className="delivery_address_form_container">
            <div className="overlay" onClick={handleToggleForm}></div>
            <div className="delivery_address_form">
                <button className="back_btn" onClick={handleToggleForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="black" />
                    </svg>
                </button>
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.25003 10C7.25003 7.37665 9.37667 5.25 12 5.25C14.6234 5.25 16.75 7.37665 16.75 10C16.75 12.6234 14.6234 14.75 12 14.75C9.37667 14.75 7.25003 12.6234 7.25003 10ZM12 6.75C10.2051 6.75 8.75003 8.20507 8.75003 10C8.75003 11.7949 10.2051 13.25 12 13.25C13.795 13.25 15.25 11.7949 15.25 10C15.25 8.20507 13.795 6.75 12 6.75Z" fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.52439 8.85685C3.87872 4.55824 7.47087 1.25 11.7841 1.25H12.216C16.5292 1.25 20.1213 4.55824 20.4757 8.85685C20.666 11.166 19.9527 13.4589 18.4861 15.2526L13.693 21.1144C12.818 22.1845 11.1821 22.1845 10.307 21.1144L5.51399 15.2526C4.04733 13.4589 3.33405 11.166 3.52439 8.85685ZM11.7841 2.75C8.25152 2.75 5.30952 5.45948 5.01932 8.98008C4.8609 10.9019 5.45455 12.8102 6.67521 14.3031L11.4683 20.1649C11.7431 20.501 12.2569 20.501 12.5318 20.1649L17.3248 14.3031C18.5455 12.8102 19.1391 10.9019 18.9807 8.98008C18.6905 5.45948 15.7485 2.75 12.216 2.75H11.7841Z" fill="black" />
                    </svg>
                    <span>
                        Add Delivery Address
                        <p>Enter your address here</p>
                    </span>
                </h2>
                <div className="contact_info">
                    <div className="address_field_title">Contact Info</div>
                    <label htmlFor="">Full Name <span className="req">*</span></label>
                    <input type="text" name="fullName" id="" required value={formData.fullName}
                        onChange={handleInputChange} />
                    <label htmlFor="">Phone Number <span className="req">*</span></label>
                    <div className="field_container">
                        <MuiPhoneNumber
                            defaultCountry={'us'}
                            name="phoneNumber"
                            className="phone_field"
                            onChange={handleInputChange}
                            value={formData.phoneNumber}
                        />
                    </div>
                </div>
                <div className="address_info">
                    <div className="address_field_title">Address Info</div>
                    <label htmlFor="">Pincode <span className="req">*</span></label>
                    <input type="number" inputMode="numeric" name="pincode" id="" required value={formData.pincode}
                        onChange={handleInputChange} />
                    <label htmlFor="">City <span className="req">*</span></label>
                    <input type="text" name="city" required value={formData.city}
                        onChange={handleInputChange} />
                    <label htmlFor="">State <span className="req">*</span></label>
                    <input type="text" name="state" required value={formData.state}
                        onChange={handleInputChange} />
                    <label htmlFor="">Locality / Area / Street <span className="req">*</span></label>
                    <input type="text" name="locality" required value={formData.locality}
                        onChange={handleInputChange} />
                    <label htmlFor="">Flat No. / Building Name <span className="req">*</span></label>
                    <input type="text" name="flatOrBuilding" required value={formData.flatOrBuilding}
                        onChange={handleInputChange} />
                    <label htmlFor="">Landmark (Optional)</label>
                    <input type="text" name="landmark" value={formData.landmark}
                        onChange={handleInputChange} />
                </div>
                {/* <div className="address_type">
                    <div className="address_field_title">Type Of Address</div>
                    <label htmlFor="home">Select Address Type *</label>
                    <div className="radio_container">
                        <input type="radio" name="address_type" id="home" />
                        <label htmlFor="home">Home</label>
                    </div>
                    <div className="radio_container">
                        <input type="radio" name="address_type" id="work" />
                        <label htmlFor="work">Work</label>
                    </div>
                    <div className="checkbox_container">
                        <input type="checkbox" name="default" id="default" />
                        <label htmlFor="default">Make default address</label>
                    </div>
                </div> */}
                <div className="button_container">
                    <button className="reset_btn" onClick={resetForm}>Reset</button>
                    {
                        addressFilled
                            ? <button className="save_btn" onClick={editAddress}>Save Changes</button>
                            : <button className="save_btn" onClick={addAddress}>Save Address</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddressForm