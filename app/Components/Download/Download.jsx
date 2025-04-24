"use client";

import { ScrollReveal } from "reveal-on-scroll-react";

function Download() {
  return (
    <>
      <section 
        id="download" 
        className="bg-[url('/bg02.png')] bg-cover bg-no-repeat bg-top-center bg-[#f8f8f8] py-20 flex items-center justify-center"
      >
        <ScrollReveal.div className="container">
          <div className="flex flex-col gap-8 max-w-4xl text-left">
            <ScrollReveal.h2 className="text-2xl font-extrabold text-[#010103]">Download our app to get most out of it</ScrollReveal.h2>
            <p className="text-lg text-[#706f7b] font-sans leading-relaxed">
              Thrown shy denote ten ladies though ask saw. Or by to he going
              think order event music. Incommode so intention defective at
              convinced. Led income months itself and houses you.
            </p>
            <div className="flex gap-8 mt-4 justify-center sm:flex-col sm:items-center">
              <img 
                alt="Download on Google Play" 
                src="/googleapp.svg" 
                className="w-1/5 cursor-pointer sm:w-56"
              />
              <img 
                alt="Download on the App Store" 
                src="/appstore.svg" 
                className="w-1/5 cursor-pointer sm:w-56"
              />
            </div>
          </div>
        </ScrollReveal.div>
      </section>
    </>
  );
}

export default Download;
