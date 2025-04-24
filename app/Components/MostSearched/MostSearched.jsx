'use client';
import React from "react";
import Link from "next/link";
import { vehicles } from "./data.jsx";

const MostSearched = () => {
  if (!vehicles || vehicles.length === 0) {
    return <p className="text-center text-gray-600 text-lg mt-8">No vehicles found.</p>;
  }

  return (
    <div className="text-center px-6 py-10">
      <p className="text-lg text-gray-700 mb-2">Popular Rental Deals</p>
      <h2 className="text-3xl font-bold mb-8">Most Popular Cars</h2>

      <div className="flex flex-wrap justify-center gap-10">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="flex flex-col w-full max-w-xl border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            <div className="w-full h-56">
              <img
                src={vehicle.image}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 py-3">
              <h3 className="text-xl font-semibold mb-1">{vehicle.brand}</h3>

              <p className="text-sm text-gray-600 flex justify-center items-center mb-1">
                <i className="fas fa-map-marker-alt mr-2 text-gray-700" />
                {vehicle.location}
              </p>

              <p className="text-sm text-yellow-500 flex justify-center items-center mb-3">
                <i className="fas fa-star mr-1" />
                {vehicle.rating} ({vehicle.reviews})
              </p>

              <hr className="border-t border-gray-300 mb-3" />

              <h4 className="text-lg font-medium mb-4">{vehicle.model}</h4>

              <div className="flex justify-between text-sm text-gray-700 mb-4">
                <div>
                  <p className="flex items-center mb-1">
                    <i className="fas fa-car mr-2" />
                    {vehicle.mileage}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-cogs mr-2" />
                    {vehicle.transmission}
                  </p>
                </div>

                <div>
                  <p className="flex items-center mb-1">
                    <i className="fas fa-gas-pump mr-2" />
                    {vehicle.fuel}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-chair mr-2" />
                    {vehicle.seats}
                  </p>
                </div>
              </div>

              <p className="text-center text-lg font-semibold text-gray-800 mb-3">
                <strong>Price</strong>&nbsp;{vehicle.price} ETB/Day
              </p>

              <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition">
                Rent Now <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 👇 Show More Button */}
      <div className="mt-10">
        <Link href="/Pages/vehicle-group">
          <button className="px-6 py-3 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition">
            Show More <i className="fas fa-angle-double-right ml-2"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MostSearched;
