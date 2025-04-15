'use client';

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LoginModal from "../login/page";
import RegisterModal from "../register/page"; // ✅ import your RegisterModal
import profileAvatar from './profile-avator.jpg'; // Import the image
import { FaUser, FaCogs, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons

const MobileNavbar = dynamic(() => import('./MobileNavbar/MobileNavbar'));

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [userStatus, setUserStatus] = useState('verified'); // Example status
  const [profilePic, setProfilePic] = useState(profileAvatar); // Use imported image here
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

  // Sidebar outside click detection
  const sidebarRef = useRef(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const storedName = localStorage.getItem("userName");
    const storedProfilePic = localStorage.getItem("userProfilePic");
    if (storedPhone) {
      setIsLoggedIn(true);
      setUserName(storedName || 'User');
      setProfilePic(storedProfilePic || 'https://via.placeholder.com/150'); // Default profile picture
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfilePic");
    setIsLoggedIn(false);
    setUserName('');
    setProfilePic('');
    setIsSidebarOpen(false); // Close sidebar on logout
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state

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
      const user = data.user;
  
      // Save values to localStorage
      localStorage.setItem('userPhone', user.phone);
      localStorage.setItem('userName', `${user.first_name} ${user.last_name}`);
      localStorage.setItem('userStatus', user.status);
      localStorage.setItem('userProfilePic', user.profile_picture || profileAvatar.src); // fallback if null
  
      // Set states
      setIsLoggedIn(true);
      setUserName(`${user.first_name} ${user.last_name}`);
      setPhone(user.phone);
      setUserStatus(user.status);
      setProfilePic(user.profile_picture || profileAvatar.src); // fallback
  
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
      <div className={`fixed top-0 left-0 right-0 z-50 text-white text-sm py-2 px-6 flex justify-between items-center ${scrollPosition > 50 ? 'bg-black bg-opacity-80' : 'bg-transparent'}`}>
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
                src={profileAvatar.src}
                alt="Profile Pic"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-white">{userName}</span>
            </div>
          )}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div 
        className={`fixed top-11 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-7xl px-6 py-4 ${scrollPosition > 50 ? 'bg-black bg-opacity-80' : 'bg-transparent'} flex justify-center transition-all duration-300`}
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
          className="fixed top-0 right-0 z-50 w-64 h-full bg-white shadow-lg pl-6"
        >
          <div className="flex items-center mb-4">
            {/* Profile Picture */}
            <img
              src={profileAvatar.src}
              alt="Profile Picture"
              className="w-8 h-8 rounded-full mr-4" // Add margin to the right for spacing
            />
            {/* Username and Status */}
            <div>
              <h2 className="font-semibold text-sm mt-14 text-blue-900">{userName}</h2>
              <p className="text-blue-900 text-xs">{phone}</p>
              <p className="text-blue-900 text-xs mt-0 text-green-400">
                <span className="text-green-300 mr-1">✔</span>{userStatus}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          {/* Sidebar Links with Blue-Black Icons */}
          <ul className="w-full">
            <li className="mb-4 text-blue-900 cursor-pointer flex items-center">
              <FaUser className="mr-3 text-blue-900 text-xl" />
              <a href="/profile">Manage Profile</a>
            </li>
            <li className="mb-4 text-blue-900 cursor-pointer flex items-center">
              <FaCogs className="mr-3 text-blue-900 text-xl" />
              <a href="/settings">Settings</a>
            </li>
            <li className="text-red-600 cursor-pointer flex items-center" onClick={handleLogout}>
              <FaSignOutAlt className="mr-3 text-blue-900 text-xl" />
              Logout
            </li>
          </ul>
        </div>
      )}

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
