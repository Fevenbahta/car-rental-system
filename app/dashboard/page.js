"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { FaUsers, FaCar, FaCheckCircle, FaChartLine, FaUserCircle, FaStar } from "react-icons/fa"; // Importing icons

// Registering the components needed by Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalCustomers: 150,
    totalVehicles: 40,
    verifiedCustomers: 130,
    totalTransactions: 30000,
    growthRate: 18,
  });

  const customers = [
    { name: "John Doe", email: "john@example.com", img: "/profile-avatar.jpg", rating: 4.8, transactions: 150 },
    { name: "Jane Smith", email: "jane@example.com", img: "/profile-avatar.jpg", rating: 4.7, transactions: 120 },
    { name: "David Lee", email: "david@example.com", img: "/profile-avatar.jpg", rating: 4.6, transactions: 110 },
  ];

  const renters = [
    { name: "Alice Brown", email: "alice@example.com", img: "/person1.jpg", rating: 4.9, rentals: 45 },
    { name: "Bob White", email: "bob@example.com", img: "/person1.jpg", rating: 4.8, rentals: 40 },
    { name: "Charlie Green", email: "charlie@example.com", img: "/person1.jpg", rating: 4.7, rentals: 35 },
  ];

  const cars = [
    {
      name: "Toyota Corolla",
      img: "/car50.jpg",
      model: "Sedan",
      features: "Fuel Efficient, Comfortable, Reliable",
      rating: 4.8,
    },
    {
      name: "Honda Civic",
      img: "/car50.jpg",
      model: "Sedan",
      features: "Sporty, Efficient, Affordable",
      rating: 4.7,
    },
    {
      name: "Ford Mustang",
      img: "/car50.jpg",
      model: "Sports Car",
      features: "Powerful, Stylish, Fast",
      rating: 4.9,
    },
  ];

  // Example data for charts
  const customerGrowthData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Customer Growth",
        data: [50, 60, 70, 90, 100, 120, 150],
        borderColor: "rgba(29, 29, 29, 1)", // Blue-Black for the graph line
        backgroundColor: "rgba(29, 29, 29, 0.2)", // Light Blue-Black fill
        fill: true,
        tension: 0.4, // Optional: to smooth out the curve
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalCustomers: 160,
        totalVehicles: 45,
        verifiedCustomers: 140,
        totalTransactions: 35000,
        growthRate: 20,
      });
    }, 5000);
  }, []);

  return (
    <div className="bg-white min-h-screen p-8 flex flex-col md:flex-row">
      {/* Left Side: Graphs and Stats Cards */}
      <div className="flex-1 mr-8 mb-8 md:mb-0">
        {/* Top Bar with Logout Icon */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-900">Dashboard Overview</h1>
        </div>

        {/* Stats Cards with white background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-xl text-blue-900 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-900 p-4 rounded-full mb-4 inline-block">
              <FaUsers className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Total Customers</h3>
            <p className="text-5xl font-bold">{stats.totalCustomers}</p>
            <p className="text-sm mt-2 text-gray-600">
              Total number of customers using the platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-blue-900 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-900 p-4 rounded-full mb-4 inline-block">
              <FaCheckCircle className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Verified Customers</h3>
            <p className="text-5xl font-bold">{stats.verifiedCustomers}</p>
            <p className="text-sm mt-2 text-gray-600">
              Number of customers with verified profiles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-blue-900 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-900 p-4 rounded-full mb-4 inline-block">
              <FaCar className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Total Vehicles</h3>
            <p className="text-5xl font-bold">{stats.totalVehicles}</p>
            <p className="text-sm mt-2 text-gray-600">
              The total number of cars available for rent.
            </p>
          </div>
        </div>

        {/* Growth Rate with White background */}
        <div className="bg-white p-6 rounded-lg shadow-xl text-blue-900 text-center transform hover:scale-105 transition-transform duration-300 mb-8">
          <div className="bg-blue-900 p-4 rounded-full mb-4 inline-block">
            <FaChartLine className="text-4xl text-white" />
          </div>
          <h3 className="text-2xl font-semibold">Growth Rate</h3>
          <p className="text-4xl font-bold text-yellow-300">{stats.growthRate}%</p>
          <p className="text-sm mt-2 text-gray-600">
            This indicates the percentage growth in user engagement over time.
          </p>
        </div>

        {/* Graphs - Cards with shadow and white background */}
        <div className=" gap-8 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Customer Growth</h3>
            <Line data={customerGrowthData} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Vehicle Growth</h3>
            <Line data={customerGrowthData} />
          </div>
        </div>
      </div>

      {/* Right Side: Top 3 Cars, Customers, and Renters */}
      <div className="flex flex-col w-full md:w-1/3">
        {/* Top 3 Customers */}
        <div className="bg-white p-6 rounded-lg shadow-2xl text-blue-900 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900">Top 3 Customers</h3>
          <div className="space-y-4">
            {customers.map((customer, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img className="w-16 h-16 rounded-full" src={customer.img} alt={customer.name} />
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">{customer.name}</p>
                  <p className="text-sm text-blue-900">{customer.email}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-yellow-500 ${i < Math.round(customer.rating) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Rating: {customer.rating} / 5</p>
                  <p className="text-xs text-gray-500 mt-1">Rank: {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}</p>
                  <p className="text-xs text-gray-500 mt-1">Transactions: {customer.transactions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Renters */}
        <div className="bg-white p-6 rounded-lg shadow-2xl text-blue-900 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900">Top 3 Renters</h3>
          <div className="space-y-4">
            {renters.map((renter, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img className="w-16 h-16 rounded-full" src={renter.img} alt={renter.name} />
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">{renter.name}</p>
                  <p className="text-sm text-blue-900">{renter.email}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-yellow-500 ${i < Math.round(renter.rating) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Rating: {renter.rating} / 5</p>
                  <p className="text-xs text-gray-500 mt-1">Rank: {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}</p>
                  <p className="text-xs text-gray-500 mt-1">Rentals: {renter.rentals}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Cars */}
        <div className="bg-white p-6 rounded-lg shadow-2xl text-blue-900">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900">Top 3 Cars</h3>
          <div className="space-y-4">
            {cars.map((car, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-md">
                  <img src={car.img} alt={car.name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">{car.name}</p>
                  <p className="text-sm text-blue-900">{car.model}</p>
                  <p className="text-xs text-gray-600">{car.features}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-yellow-500 ${i < Math.round(car.rating) ? "fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Rating: {car.rating} / 5</p>
                  <p className="text-xs text-gray-500 mt-1">Rank: {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
