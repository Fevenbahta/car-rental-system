"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css'; // Optional: Add styles
import googleLogo from './google-logo.png'; // Adjust the path as needed
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you would typically send a request to your backend to send the OTP
    console.log('Sending OTP to:', mobile);

    // Simulate sending OTP and redirecting to OTP verification page
    // router.push('/otp-verification'); // Uncomment this line when you have the OTP page

    // You can also add a notification or alert to inform the user
    alert(`OTP has been sent to ${mobile}`);
  };

  return (
    <div className="container" style={{ width: '1000px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Mobile Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="mobile">Enter your mobile number:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="tel"
              id="phone"
             
              placeholder="9 123 456 789"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ paddingLeft: '50px' }}
            />
            <span className='mr-5' style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999'
            }}>
              +251 
            </span>
          </div>
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email">Enter your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc12@gmail.com"
            required
            style={{ width: '100%', height: '40px', marginTop: '5px' }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Enter your password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', height: '40px', marginTop: '5px' }}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: 'black' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirm-password">Re-Enter your password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', height: '40px', marginTop: '5px' }}
            />
            <span 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: 'black' }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <button type="submit" className="primary">Sign Up</button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Don’t have an account? <a href="/login" style={{ color: 'black', fontWeight: 'bold', marginLeft: '5px' }}>Sign In</a>
      </p>

      <p>or</p>

      <button className="social-button">
        <img src={googleLogo.src} alt="Google Logo" />
        Continue with Google
      </button>
    </div>
  );
};

export default RegisterPage;
