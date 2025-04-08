"use client";

import { useState, useEffect } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import "./Navbar.css";
import logo from './logo.png';
import Image from 'next/image';
import dynamic from "next/dynamic";

// Dynamically import MobileNavbar
const MobileNavbar = dynamic(() => import('./MobileNavbar/MobileNavbar'));

function Navbar() {
  const [nav, setNav] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status
  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    setIsLoggedIn(!!storedPhone);
  }, []);

  return (
    <div>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <IconX width={30} height={30} />
          </div>
          <MobileNavbar />
        </div>

        {/* desktop */}
        <div className="navbar">
          <div className="navbar__linkstop" style={{ transform: `translateY(${scrollPosition * 0.3}px)` }}>
            <div className="mobile-navbar__contact">
              <i className="fas fa-phone-alt ml-2"></i> +1 222-555-33-99
              <i className="fas fa-envelope ml-4"></i> sale@carrent.com
            </div>
            <div className="mobile-navbar__special">
              <span> <i className="fas fa-car mr-2"></i>More than 800+ special collection cars this summer</span>
            </div>
            <div className="mobile-navbar__lang-currency">
              <i className="fas fa-globe ml-2"></i> EN
              <i className="fas fa-moon ml-4"></i> Dark Mode
            </div>
          </div>
          <hr />
          <hr className="navbar-divider" />
          <div className="navbar__img">
            {/* Optional logo */}
            {/* <a href="/" onClick={() => window.scrollTo(0, 0)}>
              <Image 
                src={logo}
                alt='logo-img'
                loading='lazy'
                className='logo-navbar'
              />
            </a> */}
          </div>

          <div className="navbar__main">
            <ul className="navbar__links">
              <li><a className="home-link" href="/">Home</a></li>
              <li><a className="about-link" href="#about">About</a></li>
              <li><a className="models-link" href="#pick__section">How It Works</a></li>
              <li><a className="testi-link" href="#testimonials">Vehicles</a></li>
              <li><a className="team-link" href="#download">Contact</a></li>
              <li><a className="team-link" href="#download">Need Help?</a></li>
            </ul>

            {!isLoggedIn && (
              <div className="navbar__buttons">
                <a className="navbar__buttons__sign-in" href="/login">Sign In</a>
                <a className="navbar__buttons__register" href="/register">Register</a>
              </div>
            )}
          </div>

          <hr className="navbar-divider" />

          {/* mobile hamburger */}
          <div className="mobile-hamb" onClick={openNav}>
            <IconMenu2 width={30} height={30} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
