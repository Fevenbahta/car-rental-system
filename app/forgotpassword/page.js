"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './forgotpassword.css'; // Optional: Add styles

const ForgotPasswordPage = () => {
  const router = useRouter(); // Initialize the router

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle OTP sending logic if needed (e.g., API call)

    // Redirect to the OTP Verification page
    router.push('/otpverification'); // Navigate to OTP verification page
  };

  return (
    <div className="container">
      <h2>Forgot</h2>
      <img
        src="/cuate.png"
        alt="Cuate"
        style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}
      />
      <h1>Forgot Password?</h1>
      <p>Don’t worry! It happens. Please enter the phone number associated with your account.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone" className="label-margin">Enter your mobile number:</label>

        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
            }}
          >
            +91
          </span>
          <input
            type="tel"
            id="phone"
            placeholder="458-465-6466"
            required
            style={{
              paddingLeft: '40px',
              paddingRight: '40px',
              margin: '10px 0',
              width: '100%',
            }} // Adjusted margin and width
          />
          <span
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px', // Smaller circle diameter
              height: '20px',
              borderRadius: '50%', // Makes it circular
              backgroundColor: 'black', // Circle color
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '12px' }}>✔</span> {/* Smaller tick */}
          </span>
        </div>

        <button
          type="submit"
          className="primary"
          style={{ marginTop: '20px', padding: '10px 20px' }}
        >
          Get OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
