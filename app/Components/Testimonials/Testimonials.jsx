'use client'

import React from "react";
import { IconQuote } from "@tabler/icons-react";
import Image from "next/image";
import { ScrollReveal } from "reveal-on-scroll-react"

function Testimonials() {
  return (
    <ScrollReveal.div className="bg-[#f8f8f8] py-[10rem] text-[#010103] flex items-center justify-center" id="testimonials">
      <div className="container mx-auto">
        <div className="flex flex-col">
          {/* Title Section */}
          <div className="flex flex-col text-center mx-auto mb-[5rem] max-w-[70rem]">
            <h4 className="text-[2.2rem] font-semibold font-poppins">Reviewed by People</h4>
            <h2 className="text-[4.2rem] font-extrabold mb-[1.4rem]">Client's Testimonials</h2>
            <p className="text-[1.6rem] font-poppins text-[#706f7b] leading-[1.4]">
              Discover the positive impact we've made on our clients by reading through their testimonials. 
              Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
            </p>
          </div>

          {/* Testimonials Section */}
          <div className="flex gap-[3rem] justify-center px-[3rem] py-[3rem] w-full">
            {/* Testimonial Box 1 */}
            <div className="bg-white shadow-[0_20px_40px_0_rgba(0,0,0,0.08)] w-[54rem] px-[5.5rem] py-[5rem] relative">
              <span className="text-[#1572D3] text-[6.2rem] absolute bottom-[33px] right-[60px] sm:hidden">
                <IconQuote width={60} height={60} />
              </span>
              <p className="text-[2.2rem] font-medium">
                "We rented a car from this website and had an amazing experience! The booking was easy and the rental rates were very affordable."
              </p>
              <div className="flex flex-col mt-[3rem]">
                <div className="flex gap-[2rem] items-center">
                  <Image src="/images/pfp1.jpg" alt="user_img" width={70} height={70} className="rounded-full" />
                  <span>
                    <h4 className="text-[1.8rem]">Parry Hotter</h4>
                    <p className="text-[1.6rem] font-poppins text-[#706f7b]">New York</p>
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial Box 2 */}
            <div className="bg-white shadow-[0_20px_40px_0_rgba(0,0,0,0.08)] w-[54rem] px-[5.5rem] py-[5rem] relative sm:hidden">
              <span className="text-[#1572D3] text-[6.2rem] absolute bottom-[33px] right-[60px] sm:hidden">
                <IconQuote width={60} height={60} />
              </span>
              <p className="text-[2.2rem] font-medium">
                "The car was in great condition and made our trip even better. Highly recommend this car rental website!"
              </p>
              <div className="flex flex-col mt-[3rem]">
                <div className="flex gap-[2rem] items-center">
                  <Image src="/images/pfp2.jpg" alt="user_img" width={70} height={70} className="rounded-full" />
                  <span>
                    <h4 className="text-[1.8rem]">Ron Rizzly</h4>
                    <p className="text-[1.6rem] font-poppins text-[#706f7b]">Los Angeles</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal.div>
  );
}

export default Testimonials;
