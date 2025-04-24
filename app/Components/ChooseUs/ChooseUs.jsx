'use client'

import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";

function ChooseUs() {
  return (
    <div className="bg-white pt-8 pb-40 mt-24 bg-cover bg-no-repeat bg-[url('/bg.png')] bg-[position:-225px_255px] flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col">
          <Image
            className="w-7/10 mx-auto"
            src="/car26.jpg"
            alt="car_img"
            width={700} // Add width here
            height={500} // Add height here
          />
          <div className="flex justify-around mt-12 w-full">
            <div className="text-left flex flex-col max-w-[50rem] text-[#010103]">
              <h4 className="text-2xl font-semibold mb-2">Why Choose Us</h4>
              <h2 className="text-4xl leading-tight font-extrabold mb-8">
                Best valued deals you will ever find
              </h2>
              <p className="text-xl text-[#706f7b] leading-relaxed mb-12">
                Discover the best deals you'll ever find with our unbeatable
                offers. We're dedicated to providing you with the best value for
                your money, so you can enjoy top-quality services and products
                without breaking the bank. Our deals are designed to give you the
                ultimate renting experience, so don't miss out on your chance to
                save big.
              </p>
              <a href="#home" className="text-white font-bold bg-[#1572D3] py-6 px-10 rounded-md shadow-lg transition-all duration-300 border-2 border-[#1572D3] text-xl flex items-center">
                Find Details &nbsp;
                <IconChevronRight />
              </a>
            </div>
            <div className="flex flex-col gap-18 max-w-[44rem]">
              <div className="flex">
                <Image
                  src="/icon1-1.svg"
                  alt="car-img"
                  className="w-28 h-28 mr-4"
                  width={112} // Add width here
                  height={112} // Add height here
                />
                <div className="flex flex-col gap-4 justify-center">
                  <h4 className="text-2xl">Cross Country Drive</h4>
                  <p className="text-xl text-[#706f7b] leading-relaxed">
                    Take your driving experience to the next level with our
                    top-notch vehicles for your cross-country adventures.
                  </p>
                </div>
              </div>
              <div className="flex">
                <Image
                  src="/icon2-1.svg"
                  alt="coin-img"
                  className="w-28 h-28 mr-4"
                  width={112} // Add width here
                  height={112} // Add height here
                />
                <div className="flex flex-col gap-4 justify-center">
                  <h4 className="text-2xl">All Inclusive Pricing</h4>
                  <p className="text-xl text-[#706f7b] leading-relaxed">
                    Get everything you need in one convenient, transparent
                    price with our all-inclusive pricing policy.
                  </p>
                </div>
              </div>
              <div className="flex">
                <Image
                  src="/icon3-1.svg"
                  alt="coin-img"
                  className="w-28 h-28 mr-4"
                  width={112} // Add width here
                  height={112} // Add height here
                />
                <div className="flex flex-col gap-4 justify-center">
                  <h4 className="text-2xl">No Hidden Charges</h4>
                  <p className="text-xl text-[#706f7b] leading-relaxed">
                    Enjoy peace of mind with our no hidden charges policy. We
                    believe in transparent and honest pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
