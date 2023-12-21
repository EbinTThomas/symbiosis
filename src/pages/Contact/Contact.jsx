import React from 'react'
import Header from '../Common/Header'
import MuiPhoneNumber from 'mui-phone-number'
import '../../static/styles/Contact.css'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import Footer from '../Common/Footer'

function Contact() {
  return (
    <>
      <Header />
      <BackButton />
      <PageTitle title={'Contact Us'} />
      <section className="section_contact section_content">
        <img src="https://st.depositphotos.com/2465651/3243/i/450/depositphotos_32435929-stock-photo-contact-us.jpg" alt="" />
        <form onSubmit={(e) => e.preventDefault()} className="contact_form">
          <div className="name_wrap">
            <div className="first_name form_field">
              <label htmlFor="">First name</label>
              <input type="text" className="contact_field" name="first_name" />
            </div>
            <div className="last_name form_field">
              <label htmlFor="">Last name</label>
              <input type="text" className="contact_field" name="last_name" />
            </div>
          </div>
          <div className="phone form_field">
            <label htmlFor="">Phone<span>*</span></label>
            <MuiPhoneNumber defaultCountry={'us'} className="phone_field" />
          </div>
          <div className="email form_field">
            <label htmlFor="">Email address<span>*</span></label>
            <input type="text" className="contact_field" name="email" />
          </div>
          <div className="message form_field">
            <label htmlFor="">Message<span>*</span></label>
            <textarea name="message" className="contact_field"></textarea>
          </div>
          <button className="btn_submit">Send message</button>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default Contact