"use client";

import BgShape from "./car55.jpg";
import HeroCar from "./car1.jpeg";

import { useEffect, useState, memo } from "react";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";
import Image from "next/image";

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
    <section id="home" className="relative bg-cover bg-no-repeat bg-top h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover"
          src={BgShape}
          alt="bg-shape"
          loading="lazy"
          style={{
            transform: `translateY(${scrollPosition * 0.3}px)`, // Parallax effect
            transition: 'transform 0.2s ease-out',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex flex-col justify-end items-center text-white h-full p-6">
        <div
          className="max-w-4xl mx-auto text-center md:text-left"
          style={{
            transform: `translateY(${Math.sin(scrollPosition * 0.1) * 10}px)`,
            opacity: Math.max(1 - scrollPosition / 1000, 0.7),
            transition: 'transform 0.1s ease-out, opacity 0.3s ease-out',
          }}
        >
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Search, <span className="text-blue-600">Book</span>, Drive
          </h1>
          <h4 className="text-xl font-medium mt-4">It's That Easy</h4>
          <p className="mt-4 text-base">The car of your dreams. Unbeatable prices, unlimited miles, and much more.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <a
              onClick={bookBtn}
              className="bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
              href="#booking-section"
            >
              Book Ride <IconCircleCheck />
            </a>
            <a
              className="bg-transparent border-2 border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2"
              href="/"
            >
              Learn More <IconChevronRight />
            </a>
          </div>
        </div>
      </div>

      {/* Page up button */}
      <div
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-white text-blue-600 p-3 rounded-full cursor-pointer transition-all transform hover:scale-105 ${goUp ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        ^
      </div>
    </section>
  );
}

export default memo(Hero);
