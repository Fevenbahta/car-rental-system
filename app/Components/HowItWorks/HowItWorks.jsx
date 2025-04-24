import React from 'react';

const HowItWorks = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Frame 40 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-8">
          <p className="text-lg font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full inline-block">
            How it Works
          </p>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Rent with following 3 working steps</h1>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="step bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="iconBox mb-4">
                <img src="/Frame34.png" alt="Book your car" className="w-24 mx-auto" />
              </div>
              <div className="stepContent">
                <h2 className="text-xl font-semibold text-gray-800">Book your car</h2>
                <p className="text-gray-600 mt-2">Book your car and we will deliver it directly to you</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="iconBox mb-4">
                <img src="/Frame35.png" alt="Delivery" className="w-24 mx-auto" />
              </div>
              <div className="stepContent">
                <h2 className="text-xl font-semibold text-gray-800">Delivery</h2>
                <p className="text-gray-600 mt-2">We deliver your car at your doorstep</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="iconBox mb-4">
                <img src="/Frame36.png" alt="Return" className="w-24 mx-auto" />
              </div>
              <div className="stepContent">
                <h2 className="text-xl font-semibold text-gray-800">Return</h2>
                <p className="text-gray-600 mt-2">Return the car after use</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="mt-12 grid grid-cols-2 gap-6">
        <div className="logoContainer bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="logo h-16 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="logoContainer bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="logo h-16 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
