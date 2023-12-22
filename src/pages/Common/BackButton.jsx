import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1, { replace: true })
  }
  return (
    <section id="section_back_btn">
      <button className="back_btn" onClick={handleBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L10.5607 12L14.0303 15.4697C14.3232 15.7626 14.3232 16.2374 14.0303 16.5303C13.7374 16.8232 13.2626 16.8232 12.9697 16.5303L8.96967 12.5303C8.67678 12.2374 8.67678 11.7626 8.96967 11.4697L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z" fill="black" />
        </svg>
        Back
      </button>
    </section>
  )
}

export default BackButton
