'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LoginModal from "../login/page";
import RegisterModal from "../register/page"; // ✅ import your RegisterModal

const MobileNavbar = dynamic(() => import('./MobileNavbar/MobileNavbar'));

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔐 Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // ✅ new register modal

  const [countryCode, setCountryCode] = useState('+251');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const storedName = localStorage.getItem("userName");
    if (storedPhone) {
      setIsLoggedIn(true);
      setUserName(storedName || 'User');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName('');
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    setPhoneError(value.length ? '' : 'Phone number is required');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.length < 6 ? 'Password must be at least 6 characters' : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phoneError || passwordError) return;

    const fullPhone = `0${phone}`;
    const payload = { phone: fullPhone, password };

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('https://www.carrental.emareicthub.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('userPhone', fullPhone);
      localStorage.setItem('userName', data.name || 'User');

      setIsLoggedIn(true);
      setUserName(data.name || 'User');
      setIsLoginOpen(false);
      router.push('/#hero');
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return null;

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-sm py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span><i className="fas fa-phone-alt mr-2"></i>+1 222-555-33-99</span>
          <span><i className="fas fa-envelope mr-2"></i>sale@carrent.com</span>
        </div>

        <div className="italic hidden md:block">
          <i className="fas fa-car mr-2"></i> More than 800+ special collection cars this summer
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hover:text-blue-300"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsRegisterOpen(true)} // ✅ trigger register modal
                className="bg-blue-600 hover:bg-blue-500 text-white py-1.5 px-4 rounded-md transition-all"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <span className="text-white">Welcome, {userName}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white py-1.5 px-4 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-7xl px-6 py-4 bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-md flex justify-center">
        <ul className="flex gap-6 md:gap-10 text-white text-base font-medium">
          <li><a className="hover:text-blue-500" href="/">Home</a></li>
          <li><a className="hover:text-blue-500" href="#about">About</a></li>
          <li><a className="hover:text-blue-500" href="#pick__section">How It Works</a></li>
          <li><a className="hover:text-blue-500" href="#testimonials">Vehicles</a></li>
          <li><a className="hover:text-blue-500" href="#download">Contact</a></li>
          <li><a className="hover:text-blue-500" href="#faq">Need Help?</a></li>
        </ul>
      </div>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSubmit={handleSubmit}
        phoneError={phoneError}
        passwordError={passwordError}
        loginError={loginError}
        isLoading={isLoading}
        setCountryCode={setCountryCode}
        countryCode={countryCode}
        router={router}
      />

      {/* ✅ REGISTER MODAL */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}

export default Navbar;
