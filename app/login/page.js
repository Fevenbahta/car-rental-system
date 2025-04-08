"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleLogo from './google-logo.png';
import Logo from './logo1.png'; // Replace with your actual logo path

const LoginPage = () => {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState('+251');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, '');

    if (value !== onlyNums && value.length > 0) {
      setPhoneError('Please enter phone number only');
    } else {
      setPhoneError('');
    }

    setPhone(onlyNums);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError('Password must be more than 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || phoneError || passwordError) return;

    const fullPhone = `0${phone}`;

    const loginPayload = {
      phone: fullPhone,
      password: password,
    };

    setIsLoading(true);
    setLoginError('');
    console.log(loginPayload);

    try {
      const response = await fetch('https://www.carrental.emareicthub.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      console.log('🔹 Response Status:', response.status);

      const textResponse = await response.text();
      console.log('🔹 Raw Response Body (as text):', textResponse);

      if (!response.ok) {
        throw new Error('Login failed, please check your credentials');
      }

      const data = JSON.parse(textResponse); // Parse manually from text
      console.log('✅ Parsed JSON Data:', data);

      // Store user info
      localStorage.setItem('userPhone', fullPhone);
      router.push('/#hero'); // Go to the hero section
    } catch (error) {
      setLoginError(error.message);
      console.error('❌ Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-1000 p-6">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-12 space-y-8"> {/* Much wider form */}

        <div className="text-center mb-6">
          <img src={Logo.src} alt="Logo" className="w-32 mx-auto" /> {/* Logo at the top */}
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone number */}
          <div>
            <label className="block mb-2 text-xl font-semibold">Phone Number</label>
            <div className="flex items-center gap-3">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border rounded-md px-4 py-3 text-lg"
              >
                <option value="+251">🇪🇹 +251</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>

              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="912345678"
                className={`w-full border px-6 py-3 rounded-md outline-none focus:ring-2 ${
                  phoneError ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'
                }`}
                required
              />
            </div>
            {phoneError && <p className="text-red-600 text-lg mt-2">{phoneError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-xl font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`w-full border px-6 py-3 rounded-md outline-none focus:ring-2 ${
                  passwordError ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'
                }`}
                required
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
              </span>
            </div>
            {passwordError && <p className="text-red-600 text-lg mt-2">{passwordError}</p>}
          </div>

          <div
            className="text-right text-lg text-blue-600 cursor-pointer"
            onClick={() => router.push('/forgotpassword')}
          >
            Forgot Password?
          </div>

          {loginError && <p className="text-red-600 text-lg text-center">{loginError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-full hover:bg-blue-700 transition disabled:opacity-50 text-xl font-semibold"
            disabled={isLoading || !!phoneError || !!passwordError}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-lg">
          Don’t have an account?{' '}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Sign Up
          </span>
        </p>

        <div className="flex items-center justify-between my-6">
          <hr className="border-gray-300 w-1/3" />
          <span className="text-gray-400 text-lg">or</span>
          <hr className="border-gray-300 w-1/3" />
        </div>
        <button className="w-full border border-gray-300 flex items-center justify-center gap-6 py-4 rounded-md hover:bg-gray-50 transition">
          <img src={GoogleLogo.src} alt="Google Logo" className="w-8 h-8" />
          <span className="text-xl font-semibold">Continue with Google</span>
        </button>

        <button className="w-full border border-gray-300 py-4 rounded-md hover:bg-gray-50 transition text-xl font-semibold">
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
