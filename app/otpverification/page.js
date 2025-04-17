"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation"; // Import useSearchParams to retrieve query params
import './verify-otp.css'; // Optional: Add styles

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Access URL search params
  const phone = searchParams.get("phone"); // Retrieve phone number from the URL

  const [otp, setOtp] = useState(['', '', '', '', '', '']); // For 6 OTP digits
  const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
  const [otpError, setOtpError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Handle OTP input change
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Keep only the first character
    setOtp(newOtp);
    useEffect(() => {
      if (phone) {
        localStorage.setItem("userPhone", phone);
      }
    }, [phone]);
  
    // Move focus to the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error state
    setOtpError('');
    setGeneralError('');

    if (otp.some(digit => digit === '')) {
      setOtpError("All OTP fields are required.");
      console.log("Error: OTP fields are incomplete.");
      return;
    }

    const otpString = otp.join(''); // Join the OTP digits into a string
    console.log("Request Payload:", {
      phone,
      otp: otpString
    });
  
    try {
      const response = await fetch("https://www.carrental.emareicthub.com/api/verify-phone-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp: otpString }), // Send both phone and OTP as a JSON object
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.log("Error Response:", data); // Log the error response from the API
        if (data.message === "Invalid or expired OTP.") {
          
          setGeneralError("The OTP you entered is invalid or expired. Please try again.");
        } else {
          setGeneralError(data.message || "Failed to verify OTP. Please try again.");
        }
      } else {
        const data = await response.json();
        const user = data.user;
  
        localStorage.setItem('userPhone', user.phone);
        localStorage.setItem('userName', `${user.first_name} ${user.last_name}`);
        localStorage.setItem('userStatus', user.status);
        localStorage.setItem('userProfilePic', user.profile_picture || profileAvatar.src);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('token', data.token);
     
        // Successfully verified OTP, redirect to the next step (e.g., dashboard)
        router.push("/#hero");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setGeneralError("Network error. Please try again.");
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0 && otp.some(digit => digit === '')) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, otp]);

  // Stop timer when OTP is fully entered (6 digits)
  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      setTimer(0); // Stop the timer
    }
  }, [otp]);

  return (
    <div className="container" style={{ width: '600px', margin: '50px auto', padding: '50px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h1>Enter OTP</h1>
      <img src="otp.png" alt="OTP Illustration" style={{ width: '300px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      <p>A 6-digit OTP has been sent to <strong>{phone}</strong></p>

      {/* Display General Error Message */}
      {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

      {/* OTP Input Form */}
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

        {/* OTP Error Message */}
        {otpError && <p style={{ color: 'red' }}>{otpError}</p>}

        <button type="submit" className="primary" style={{ marginTop: '20px', padding: '10px 20px' }}>Verify</button>
      </form>

      {/* Timer Countdown */}
      <p style={{ marginTop: '20px' }}>
        Resend OTP in {timer > 0 ? `${timer} seconds` : '00'}
      </p>
    </div>
  );
};

export default VerifyOtpPage;
