import React, { useState } from 'react'
import Header from '../Common/Header'
import MuiPhoneNumber from 'mui-phone-number'
import '../../static/styles/Contact.css'
import BackButton from '../Common/BackButton'
import PageTitle from '../Common/PageTitle'
import Footer from '../Common/Footer'

const MSG_URL = '/api/message/'
function Contact() {
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    title: '',
    message: '',
  });

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(MSG_URL, form);
      setSuccessMsg('Message has been sent!');
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <BackButton />
      <PageTitle title={'Contact Us'} />
      <section className="section_contact section_content">
        <img
          src="/assets/img/contact.png"
          alt=""
        />
        <form onSubmit={(e) => handleMessage(e)} className="contact_form">
          <div className="name_wrap">
            <div className="first_name form_field">
              <label htmlFor="">First name</label>
              <input
                type="text"
                className="contact_field"
                name="first_name"
                onChange={handleInputChange}
                value={form.first_name}
              />
            </div>
            <div className="last_name form_field">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                className="contact_field"
                name="last_name"
                onChange={handleInputChange}
                value={form.last_name}
              />
            </div>
          </div>
          <div className="phone form_field">
            <label htmlFor="">Phone</label>
            <MuiPhoneNumber
              defaultCountry={'us'}
              className="phone_field"
              onChange={(value) => setForm({ ...form, phone: value })}
              value={form.phone}
            />
          </div>
          <div className="email form_field">
            <label htmlFor="">Email address</label>
            <input
              type="text"
              className="contact_field"
              name="email"
              onChange={handleInputChange}
              value={form.email}
            />
          </div>
          <div className="title form_field">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="contact_field"
              name="title"
              onChange={handleInputChange}
              value={form.title}
            />
          </div>
          <div className="message form_field">
            <label htmlFor="">Message</label>
            <textarea
              name="message"
              className="contact_field"
              onChange={handleInputChange}
              value={form.message}
            ></textarea>
          </div>
          <button className="btn_submit">Send message</button>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default Contact