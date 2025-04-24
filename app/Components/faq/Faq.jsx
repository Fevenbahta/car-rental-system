'use client'

import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { ScrollReveal } from "reveal-on-scroll-react";

function Faq() {
  const [activeQ, setActiveQ] = useState(null);

  const toggleQuestion = (id) => {
    setActiveQ(activeQ === id ? null : id);
  };

  return (
    <ScrollReveal.div className="faq-section bg-cover bg-no-repeat bg-center py-[10rem] flex items-center justify-center relative">
      <div className="container mx-auto">
        <div className="faq-content flex flex-col text-[#010103]">
          {/* Title Section */}
          <div className="faq-content__title text-center mx-auto mb-[7rem] max-w-[80rem]">
            <h5 className="text-[2rem] font-bold">FAQ</h5>
            <h2 className="text-[4rem] mb-[1.7rem] font-bold">Frequently Asked Questions</h2>
            <p className="text-[1rem] text-[#706f7b]">
              Frequently Asked Questions About the Car Rental Booking Process
              on Our Website: Answers to Common Concerns and Inquiries.
            </p>
          </div>

          {/* Questions Section */}
          <div className="all-questions flex flex-col items-center mt-[7rem]">
            {/* Question Box 1 */}
            <div className="faq-box w-full max-w-[80rem] bg-white shadow-md cursor-pointer mb-6">
              <div
                id="q1"
                onClick={() => toggleQuestion("q1")}
                className={`faq-box__question flex justify-between items-center px-[4.5rem] py-[1.8rem] transition-all duration-150 ${
                  activeQ === "q1" ? "bg-[#ff4d30] text-white" : ""
                }`}
              >
                <p className="text-[1.8rem] font-medium">1. What is special about comparing rental car deals?</p>
                <IconChevronDown />
              </div>
              <div
                className={`faq-box__answer text-[1.6rem] text-[#706f7b] px-[4.5rem] py-[2.8rem] transition-all duration-400 ease-in-out ${
                  activeQ === "q1" ? "max-h-[20rem] overflow-visible" : "max-h-0 overflow-hidden"
                }`}
              >
                Comparing rental car deals is important as it helps find the
                best deal that fits your budget and requirements, ensuring you
                get the most value for your money. By comparing various
                options, you can find deals that offer lower prices,
                additional services, or better car models.
              </div>
            </div>

            {/* Question Box 2 */}
            <div className="faq-box w-full max-w-[80rem] bg-white shadow-md cursor-pointer mb-6">
              <div
                id="q2"
                onClick={() => toggleQuestion("q2")}
                className={`faq-box__question flex justify-between items-center px-[4.5rem] py-[1.8rem] transition-all duration-150 ${
                  activeQ === "q2" ? "bg-[#ff4d30] text-white" : ""
                }`}
              >
                <p className="text-[1.8rem] font-medium">2. How do I find the car rental deals?</p>
                <IconChevronDown />
              </div>
              <div
                className={`faq-box__answer text-[1.6rem] text-[#706f7b] px-[4.5rem] py-[2.8rem] transition-all duration-400 ease-in-out ${
                  activeQ === "q2" ? "max-h-[20rem] overflow-visible" : "max-h-0 overflow-hidden"
                }`}
              >
                You can find car rental deals by researching online and
                comparing prices from different rental companies. Websites
                such as Expedia, Kayak, and Travelocity allow you to compare
                prices and view available rental options.
              </div>
            </div>

            {/* Question Box 3 */}
            <div className="faq-box w-full max-w-[80rem] bg-white shadow-md cursor-pointer mb-6">
              <div
                id="q3"
                onClick={() => toggleQuestion("q3")}
                className={`faq-box__question flex justify-between items-center px-[4.5rem] py-[1.8rem] transition-all duration-150 ${
                  activeQ === "q3" ? "bg-[#ff4d30] text-white" : ""
                }`}
              >
                <p className="text-[1.8rem] font-medium">3. How do I find such low rental car prices?</p>
                <IconChevronDown />
              </div>
              <div
                className={`faq-box__answer text-[1.6rem] text-[#706f7b] px-[4.5rem] py-[2.8rem] transition-all duration-400 ease-in-out ${
                  activeQ === "q3" ? "max-h-[20rem] overflow-visible" : "max-h-0 overflow-hidden"
                }`}
              >
                Book in advance: Booking your rental car ahead of time can
                often result in lower prices. Compare prices from multiple
                companies: Use websites like Kayak, Expedia, or Travelocity to
                compare prices from multiple rental car companies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal.div>
  );
}

export default Faq;
