"use client";

import BgShape from "./car43.jpg";
import HeroCar from "./car1.jpeg";

import { useEffect, useState, memo } from "react";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";
import Image from "next/image";
import "./Hero.css";

function Hero() {
  const [goUp, setGoUp] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bookBtn = () => {
    document.querySelector("#booking-section").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      setScrollPosition(window.pageYOffset); // Track the scroll position

      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };

    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          <Image
            className="bg-shape"
            src={BgShape}
            alt="bg-shape"
            loading="lazy"
            style={{
              transform: `translateY(${scrollPosition * 0.3}px)`, // Smooth movement of background image
              transition: 'transform 0.2s ease-out', // Smooth transition
            }}
          />
          <div className="hero-content">
          <div
  className="hero-content__text"
  style={{
    transform: `translateY(${Math.sin(scrollPosition * 0.1) * 10}px)`, // Small movement with a sine wave effect
    opacity: Math.max(1 - scrollPosition / 1000, 0.7), // Gradual fade out but maintain more visibility
    transition: 'transform 0.1s ease-out, opacity 0.3s ease-out', // Quick return for transform, gradual fade out
  }}
>
                  <h1>
                Search, <span>Book,</span>Drive
              </h1><h4>It's That Easy</h4>
          
              <p>
                the car of your dreams. Unbeatable prices, unlimited miles and much more.
              </p>
              <div className="hero-content__text__btns">
                <a
                  onClick={bookBtn}
                  className="hero-content__text__btns__book-ride"
                  href="#booking-section"
                >
                  Book Ride &nbsp; <IconCircleCheck />
                </a>
                <a className="hero-content__text__btns__learn-more" href="/">
                  Learn More &nbsp; <IconChevronRight />
                </a>
              </div>
            </div>

            {/* Optionally, you can also animate the car image */}
            {/* <Image
              src={HeroCar}
              alt="car-img"
              className="hero-content__car-img"
              loading="lazy"
              style={{
                transform: `translateY(${scrollPosition * 0.5}px)`, // Smooth movement for the car image
                transition: 'transform 0.3s ease-out', // Smooth transition
              }}
            /> */}
          </div>
        </div>

        {/* page up */}
        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          ^
        </div>
      </section>
    </>
  );
}

export default memo(Hero);
