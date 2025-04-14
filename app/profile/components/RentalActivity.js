"use client";

import { useState } from "react";
import {
  FaCar,
  FaDownload,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export default function RentalActivity() {
  const [activeTab, setActiveTab] = useState("current");

  const mockRentals = {
    current: [
      {
        id: 1,
        car: {
          make: "Toyota",
          model: "Camry",
          year: 2022,
          image: "/car1.jpg",
        },
        period: {
          start: "2025-04-10",
          end: "2025-04-25",
        },
        locations: {
          pickup: "Megenagna, Addis Ababa",
          dropoff: "Megenagna, Addis Ababa",
        },
        status: "active",
        total: 250.0,
      },
    ],
    upcoming: [
      {
        id: 2,
        car: {
          make: "Honda",
          model: "Civic",
          year: 2023,
          image: "/car2.jpg",
        },
        period: {
          start: "2025-05-01",
          end: "2025-05-05",
        },
        locations: {
          pickup: "4 kilo, Addis Ababa",
          dropoff: "4 kilo, Addis Ababa",
        },
        status: "upcoming",
        total: 300.0,
      },
    ],
    past: [
      {
        id: 3,
        car: {
          make: "Ford",
          model: "Mustang",
          year: 2021,
          image: "/car3.jpg",
        },
        period: {
          start: "2025-02-15",
          end: "2025-02-20",
        },
        locations: {
          pickup: "Bole, Addis Ababa",
          dropoff: "Bole, Addis Ababa",
        },
        status: "completed",
        total: 400.0,
        review: {
          rating: 5,
          comment: "Great car and smooth rental experience!",
        },
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <FaStar
          key={index}
          className={`${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {["current", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Rentals
          </button>
        ))}
      </div>

      {/* Rental List */}
      <div className="space-y-6">
        {mockRentals[activeTab].map((rental) => (
          <div key={rental.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Car Image */}
              <div className="flex-shrink-0">
                <div className="w-48 h-32 rounded-lg overflow-hidden">
                  <img
                    src={rental.car.image}
                    alt={`${rental.car.make} ${rental.car.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Rental Details */}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {rental.car.make} {rental.car.model} ({rental.car.year})
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          rental.status
                        )}`}
                      >
                        {rental.status.charAt(0).toUpperCase() +
                          rental.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ${rental.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Rental Period</p>
                      <p className="font-medium">
                        {new Date(rental.period.start).toLocaleDateString()} -{" "}
                        {new Date(rental.period.end).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-medium">{rental.locations.pickup}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Drop-off Location</p>
                      <p className="font-medium">{rental.locations.dropoff}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                    <FaDownload />
                    <span>Download Invoice</span>
                  </button>
                  {!rental.review && rental.status === "completed" && (
                    <button className="flex items-center space-x-2 text-green-500 hover:text-green-600">
                      <FaStar />
                      <span>Leave Review</span>
                    </button>
                  )}
                </div>

                {/* Review Section */}
                {rental.review && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {renderStars(rental.review.rating)}
                    </div>
                    <p className="mt-2 text-gray-600">
                      {rental.review.comment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
