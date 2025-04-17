'use client';

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FaUser, FaGlobe, FaWrench, FaCommentDots, FaCogs, FaSignOutAlt } from "react-icons/fa";
import LoginModal from "../login/page.jsx";
import RegisterModal from "../register/page.jsx";
import profileAvatar from './profile-avator.jpg';

const MobileNavbar = dynamic(() => import('./MobileNavbar/MobileNavbar'));

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userStatus, setUserStatus] = useState('verified');
  const [profilePic, setProfilePic] = useState(profileAvatar);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+251');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const router = useRouter();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const storedName = localStorage.getItem("userName");
    const storedProfilePic = localStorage.getItem("userProfilePic");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedPhone) {
      setIsLoggedIn(true);
      setEmail(storedEmail || '');
      setUserName(storedName || 'User');
      setProfilePic(storedProfilePic || 'https://via.placeholder.com/150');

    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setProfilePic('');
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
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

      if (!response.ok) throw new Error('Invalid UserName And Password');

      const data = await response.json();
      const user = data.user;

      localStorage.setItem('userPhone', user.phone);
      localStorage.setItem('userName', `${user.first_name} ${user.last_name}`);
      localStorage.setItem('userStatus', user.status);
      localStorage.setItem('userProfilePic', user.profile_picture || profileAvatar.src);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('token', data.token);
       // Log the token after storing it
console.log("Stored token:", data.token);  // Debugging log to confirm it's stored

      setEmail(user.email);
      setIsLoggedIn(true);
      setUserName(`${user.first_name} ${user.last_name}`);
      setPhone(user.phone);
      setUserStatus(user.status);
      setProfilePic(user.profile_picture || profileAvatar.src);
      setIsLoginOpen(false);
      router.push('/');
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
      <div className={`fixed top-0 left-0 right-0 z-50 text-white text-sm py-2 px-6 flex justify-between items-center ${scrollPosition > 50 ? 'bg-black bg-opacity-60' : 'bg-transparent'}`}>
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
            <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
              <img
             src="/profile-avatar.jpg" 
                alt="Profile Pic"
                className="w-8 h-10 rounded-full mr-2"
              />
              <span className="text-white">{userName}</span>
            </div>
          )}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div 
        className={`fixed top-11 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-7xl px-6 py-4 ${scrollPosition > 50 ? 'bg-black bg-opacity-60' : 'bg-transparent'} flex justify-center transition-all duration-300`}
      >
        <ul className="flex gap-6 md:gap-10 text-white text-base font-medium">
          <li><a className="hover:text-blue-500" href="/">Home</a></li>
          <li><a className="hover:text-blue-500" href="#about">About</a></li>
          <li><a className="hover:text-blue-500" href="#pick__section">How It Works</a></li>
          <li><a className="hover:text-blue-500" href="#testimonials">Vehicles</a></li>
          <li><a className="hover:text-blue-500" href="#download">Contact</a></li>
          <li><a className="hover:text-blue-500" href="#faq">Need Help?</a></li>
        </ul>
      </div>
      {isSidebarOpen && (
  <div
    ref={sidebarRef}
    className="fixed top-0 right-0 z-50 w-64 h-full bg-gray-900 shadow-lg p-6"
  >
    <div className="flex flex-col items-center mb-4 mt-10">
      <img
        src={profileAvatar?.src || "//profile-avator.jpg"}
        alt="Profile Picture"
        className="w-16 h-16 rounded-full mb-2"
      />
      <div className="text-center">
        <h2 className="font-semibold text-sm text-white">{userName || "User"}</h2>
        <p className="text-gray-300 text-xs">{phone || "N/A"}</p>
        {email && (
    <p className="text-gray-400 text-xs">{email}</p> // 👈 Email line
  )}
        <p className="text-green-400 text-xs">
          <span className="mr-1">✔</span>{userStatus || "Active"}
        </p>
      </div>
    </div>

    <hr className="my-4 border-gray-700" />

    <ul className="w-full mt-6">
      <li className="mb-4 text-white cursor-pointer flex items-center">
        <FaUser className="mr-3 text-grey-400 text-sm" />
        <a href="/profile">Manage Account</a>
      </li>
      <li className="mb-4 text-white cursor-pointer flex items-center">
        <FaGlobe className="mr-3 text-grey-400 text-sm" />
        <a href="/language">Language</a>
      </li>
      <li className="mb-4 text-white cursor-pointer flex items-center">
        <FaWrench className="mr-3 text-grey-400 text-sm" />
        <a href="/settings">Settings</a>
      </li>
      <li className="mb-4 text-white cursor-pointer flex items-center">
        <FaCommentDots className="mr-3 text-grey-400 text-sm" />
        <a href="/feedback">Feedback</a>
      </li>
    </ul>

    <hr className="my-4 border-gray-700" />

    <div className="flex justify-center">
      <button
        onClick={handleLogout}
        className="flex items-center bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        <FaSignOutAlt className="mr-2 text-white text-xl" />
        Logout
      </button>
    </div>
  </div>
)}



      {/* LOGIN MODAL */}
      <LoginModal
  isOpen={isLoginOpen}
  onClose={() => setIsLoginOpen(false)}
  onShowRegister={() => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }}
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
  onShowLogin={() => {
    setIsRegisterOpen(false); // Close register modal
    setIsLoginOpen(true);     // Open login modal
  }}
/>

    </>
  );
}

export default Navbar;
