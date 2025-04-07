'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import GoogleLogo from './google-logo.png';

const LoginPage = () => {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState('+251');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
    if (value.length > 0 && !isValid) {
      setPasswordError('Password must be at least 6 characters and include letters and numbers');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phoneError || passwordError) return;

    const fullPhone = `${countryCode}${phone}`;
    console.log({ phone: fullPhone, password });

    // Add login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone number */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <div className="flex items-center gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border rounded-md px-2 py-2 text-sm"
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
                className={`w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ${
                  phoneError ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'
                }`}
                required
              />
            </div>
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className={`w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ${
                  passwordError ? 'border-red-500 ring-red-200' : 'focus:ring-blue-200'
                }`}
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div
            className="text-right text-sm text-blue-600 cursor-pointer"
            onClick={() => router.push('/forgotpassword')}
          >
            Forgot Password?
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!!phoneError || !!passwordError}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <span
            className="text-blue-600 font-medium cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Sign Up
          </span>
        </p>

        <div className="flex items-center justify-between my-4">
          <hr className="border-gray-300 w-1/3" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="border-gray-300 w-1/3" />
        </div>

        <button className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-50 transition">
          <img src={GoogleLogo.src} alt="Google Logo" className="w-4 h-4" />
          <span className="text-sm">Continue with Google</span>
        </button>

        <button className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition text-sm">
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
