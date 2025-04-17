"use client"; // Ensure this is at the top for Next.js client-side rendering

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './forgotpassword.css';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Reset error before making the request

    // Validate that email ends with @gmail.com
    if (!email.endsWith('@gmail.com')) {
      setError('Please enter a valid Gmail address (e.g., your-email@gmail.com)');
      setIsLoading(false);
      return;
    }

    try {
      // Make the API call to send the reset link
      const response = await fetch('https://www.carrental.emareicthub.com/api/send-reset-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        mode: 'no-cors', // Disable CORS validation
      });

      const data = await response.json();

      if (response.ok) {
        if (data.url) {
          router.push(data.url); // Redirect to the URL from the API response
        } else {
          setError('Unexpected response format. No URL provided.');
        }
      } else {
        setError(data.message || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please check your network connection.');
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state after the request
    }
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
      <p>Don’t worry! It happens. Please enter the email address associated with your account.</p>

      <form onSubmit={handleSubmit}>
  <label 
    htmlFor="email" 
    className="label-margin mt-5 text-xl font-semibold" // Increased font size
  >
    Enter your email address:
  </label>
  <input
    type="email"
    id="email"
    placeholder="your-email@gmail.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    style={{
      padding: '16px', // Increased padding for a larger input
      margin: '10px 0',
      width: '100%', // Full width for the input
      fontSize: '18px', // Increased font size for input text
      borderRadius: '8px', // Optional: Make the input have rounded corners
    }}
  />

  <button
    type="submit"
    className="primary mt-5 text-xl font-semibold" // Increased font size and margin-top for button
    style={{ padding: '12px 24px' }} // Increased button padding
    disabled={isLoading}
  >
    {isLoading ? 'Sending...' : 'Send Reset Link'}
  </button>
</form>


      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;