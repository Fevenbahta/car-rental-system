"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './verify-otp.css'; // Optional: Add styles

const VerifyOtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle OTP verification here
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Keep only the first character
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput.focus();
    }
  };

  return (
    <div className="container" style={{ width: '600px', margin: '50px auto', padding: '50px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h1>Enter OTP</h1>
      <img src="otp.png" alt="OTP Illustration" style={{ width: '300px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      <p>A 4-digit OTP has been sent to</p>
      <p style={{ fontWeight: 'bold' }}>458-465-6466</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              style={{ width: '60px', height: '60px', fontSize: '24px', textAlign: 'center', margin: '0 5px', border: '2px solid #ccc', borderRadius: '8px' }}
            />
          ))}
        </div>
        <button type="submit" className="primary" style={{ marginTop: '20px', padding: '10px 20px' }}>Verify</button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Resend OTP in {timer > 0 ? `${timer} seconds` : '00'}
      </p>
    </div>
  );
};

export default VerifyOtpPage;
