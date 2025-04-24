'use client';

import Image from "next/image";

function PlanTrip() {
  return (
    <section
      id="about"
      className="bg-white py-20 flex justify-center items-center text-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Title */}
          <div className="text-center text-[#010103] font-bold">
            <h3 className="text-2xl font-medium font-poppins">How It Works</h3>
            <h2 className="text-4xl my-5 font-poppins">Quick &amp; easy car rental</h2>
          </div>

          {/* Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4">
            {/* Box 1 */}
            <div className="text-center px-6 flex flex-col items-center">
              <Image
                src="/caricon3.jpg"
                alt="Select Car"
                width={80}
                height={80}
                className="mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
              />
              <h3 className="text-2xl font-bold mt-2">Select Car</h3>
              <p className="text-base text-[#706f7b] leading-relaxed font-poppins mt-2">
                We offer a big range of vehicles for all your driving needs. We have the perfect car to meet your needs.
              </p>
            </div>

            {/* Box 2 */}
            <div className="text-center px-6 flex flex-col items-center">
              <Image
                src="/caricon3.jpg"
                alt="Pick a Date"
                width={80}
                height={80}
                className="mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
              />
              <h3 className="text-2xl font-bold mt-2">Pick a Date</h3>
              <p className="text-base text-[#706f7b] leading-relaxed font-poppins mt-2">
                Pick a Date when you want to rent and enjoy the ride.
              </p>
            </div>

            {/* Box 3 */}
            <div className="text-center px-6 w-full max-w-sm mx-auto flex flex-col items-center">
              <Image
                src="/caricon.jpg"
                alt="Drive"
                width={80}
                height={80}
                className="mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
              />
              <h3 className="text-2xl font-bold mt-2">Let's Drive</h3>
              <p className="text-base text-[#706f7b] leading-relaxed font-poppins mt-2">
                Whether you're hitting the open road, we've got you covered with our wide range of cars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanTrip;
