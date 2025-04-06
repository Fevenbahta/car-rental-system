// app/login/page.tsx

"use client"; // Add this directive to specify this as a client component

import React from 'react';
import { useRouter } from 'next/navigation'; // Update import for useRouter
import './login.css';
import GoogleLogo from './google-logo.png';
// /app/login/page.js

import { FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginPage = () => {
  const router = useRouter(); // Initialize useRouter
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Navigation handlers
  const handleForgotPassword = () => {
    router.push('/forgotpassword'); // Navigate to Forget Password page
  };

  const handleRegister = () => {
    router.push('/register'); // Navigate to Register page
  };

  return (
    <div className="container">

      <h1>Login</h1>
      <form>
        <label htmlFor="phone">Enter your phone number:</label>
        <div style={{ position: 'relative' }}>
          <input
            type="tel"
            id="phone"
            placeholder="9 123 456 789"
            required
            style={{ paddingLeft: '50px' }} // Added padding for the country code
          />
          <span className='mr-5'style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            +251 
          </span>
        </div>

        <label htmlFor="password">Enter your password:</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="forgot-password" onClick={handleForgotPassword}>
        Forgot Password?
      </div>
        <button type="submit" className="primary">Login</button>
      </form>
      <p>
  Don't have an account? <a href="#" className="signup" onClick={handleRegister}>Sign Up</a>
</p>

      <p className="separator">or</p>
      <button className="social-button">
        <img src={GoogleLogo.src} alt="Google Logo" />
        Continue with Google
      </button>
      <p className="separator">or</p>
      <button className="secondary guest">Continue as Guest</button>
    </div>
  );
};

export default LoginPage;
