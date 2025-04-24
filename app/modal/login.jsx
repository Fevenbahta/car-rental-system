'use client';

import { useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Flag from 'react-world-flags';

const LoginModal = ({
  isOpen,
  onClose,
  onShowRegister,
  phone,
  setPhone,
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  phoneError,
  passwordError,
  loginError,
  isLoading,
  setCountryCode,
  countryCode,
  router,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const googleAuthUrl = `${baseUrl}/api/auth/google`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-xl w-full max-w-md p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        {/* Logo */}
        <div className="text-center mb-4">
          <Image src="/logo1.png" alt="/logo1.png" className="mx-auto" width={80} height={80} />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Phone Input */}
          <div>
            <label className="block mb-1 text-sm font-medium">Phone Number</label>
            <div className="flex gap-2 items-center">
  <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value="+251">
                  <Flag code="ET" className="inline-block w-6 h-6 mr-2" />
                  +251
                </option>
                <option value="+1">
                  <Flag code="US" className="inline-block w-6 h-6 mr-2" />
                  +1
                </option>
                <option value="+44">
                  <Flag code="GB" className="inline-block w-6 h-6 mr-2" />
                  +44
                </option>
                <option value="+91">
                  <Flag code="IN" className="inline-block w-6 h-6 mr-2" />
                  +91
                </option>
              </select>

              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ''))
                }
                className={`w-full border px-3 py-2 rounded-md text-sm ${
                  phoneError ? 'border-red-500' : 'focus:ring focus:ring-blue-200'
                }`}
                placeholder="912345678"
                required
              />
            </div>
            {phoneError && (
              <p className="text-sm text-red-500 mt-1">{phoneError}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border px-3 py-2 rounded-md text-sm ${
                  passwordError ? 'border-red-500' : 'focus:ring focus:ring-blue-200'
                }`}
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </span>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Login Error */}
          {loginError && (
            <p className="text-center text-sm text-red-600">{loginError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center text-sm mt-4">
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => {
              router.push('/forgotpassword');
              onClose();
            }}
          >
            Forgot Password?
          </span>
        </p>

        {/* Register Link */}
        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={onShowRegister}
          >
            Sign Up
          </span>
      
        <p className="text-gray-900 text-sm mt-1">or</p>
        <a href={googleAuthUrl}>
  <button className="flex items-center gap-2 border mx-auto px-10 py-2 rounded bg-gray-100">
    <img src="/google-logo.png" alt="Google" className="w-7 h-7" />
    <span className="text-sm">Continue with Google</span>
  </button>
</a>
 </p>
      </div>
    </div>
  );
};

export default LoginModal;