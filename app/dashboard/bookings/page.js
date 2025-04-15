"use client";

import { useState } from "react";
import { FaCar, FaCalendarAlt, FaLocationArrow } from "react-icons/fa"; // Icons for car, calendar, location
import { GrUser } from "react-icons/gr"; // User icon

export default function BookingPage() {
  const [searchTerm, setSearchTerm] = useState({
    location: "",
    date: "",
    carType: "",
  });

  // Sample data for bookings with a common avatar image
  const [bookings] = useState([
    {
      name: "John Doe",
      avatar: "/profile-avatar.jpg", // Custom image path from public folder
      bookings: 5,
      posts: 2,
      carType: "Sedan",
      location: "New York",
      lastBookingDate: "2025-04-10",
    },
    {
      name: "Jane Smith",
      avatar: "/profile-avatar.jpg", // Custom image path from public folder
      bookings: 8,
      posts: 3,
      carType: "SUV",
      location: "California",
      lastBookingDate: "2025-04-12",
    },
    {
      name: "Michael Brown",
      avatar: "/profile-avatar.jpg", // Custom image path from public folder
      bookings: 3,
      posts: 1,
      carType: "Hatchback",
      location: "Texas",
      lastBookingDate: "2025-04-15",
    },
    {
      name: "Sarah Lee",
      avatar: "/profile-avatar.jpg", // Custom image path from public folder
      bookings: 10,
      posts: 5,
      carType: "Convertible",
      location: "Florida",
      lastBookingDate: "2025-04-11",
    },
    {
      name: "David Wilson",
      avatar: "/profile-avatar.jpg", // Custom image path from public folder
      bookings: 4,
      posts: 2,
      carType: "SUV",
      location: "Nevada",
      lastBookingDate: "2025-04-13",
    },
  ]);

  // Filter bookings based on search criteria
  const filteredBookings = bookings.filter((booking) => {
    return (
      (searchTerm.location === "" || booking.location.toLowerCase().includes(searchTerm.location.toLowerCase())) &&
      (searchTerm.date === "" || booking.lastBookingDate.includes(searchTerm.date)) &&
      (searchTerm.carType === "" || booking.carType.toLowerCase().includes(searchTerm.carType.toLowerCase()))
    );
  });

  return (
    <div className="bg-white min-h-screen text-gray-900 p-8">
      {/* Search Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-900 mb-2">Search Bookings</h2>
        <div className="flex gap-6 mb-4">
          <div className="flex items-center">
            <FaLocationArrow className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Location"
              value={searchTerm.location}
              onChange={(e) => setSearchTerm({ ...searchTerm, location: e.target.value })}
              className="ml-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Date"
              value={searchTerm.date}
              onChange={(e) => setSearchTerm({ ...searchTerm, date: e.target.value })}
              className="ml-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <FaCar className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Car Type"
              value={searchTerm.carType}
              onChange={(e) => setSearchTerm({ ...searchTerm, carType: e.target.value })}
              className="ml-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Total Bookings Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-900 mb-2">Total Bookings</h2>
        <div className="flex gap-8 mb-4 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-blue-600" />
            <p>By Date: 2025-04-15</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaLocationArrow className="text-blue-600" />
            <p>By Location: Texas</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaCar className="text-blue-600" />
            <p>By Car Type: SUV</p>
          </div>
        </div>
      </div>

      {/* Customer Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={booking.avatar} // Custom avatar image path from public folder
                  alt={booking.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">{booking.name}</h3>
                  <p className="text-sm text-gray-500">{booking.carType}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaCar className="mr-2" /> Bookings: {booking.bookings}
                  </p>
                  <p className="flex items-center">
                    <GrUser className="mr-2" /> Posts: {booking.posts}
                  </p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaLocationArrow className="mr-2" /> Location: {booking.location}
                  </p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> Last Booking: {booking.lastBookingDate}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">No bookings match your search criteria.</div>
        )}
      </div>
    </div>
  );
}
