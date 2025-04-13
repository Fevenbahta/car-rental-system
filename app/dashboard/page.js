"use client";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement, // Registering Point element
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registering the components needed by Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement, // Registering Point
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

  // Example data for charts
  const customerGrowthData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Customer Growth",
        data: [50, 60, 70, 90, 100, 120, 150],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>

      {/* Stats Cards with gradient background */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-xl text-white text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Total Customers</h3>
          <p className="text-5xl font-bold">{stats.totalCustomers}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-xl text-white text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Verified Customers</h3>
          <p className="text-5xl font-bold">{stats.verifiedCustomers}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 p-6 rounded-lg shadow-xl text-white text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold">Total Vehicles</h3>
          <p className="text-5xl font-bold">{stats.totalVehicles}</p>
        </div>
      </div>

      {/* Growth Rate with Gradient */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-xl text-white text-center transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-2xl font-semibold">Growth Rate</h3>
        <p className="text-4xl font-bold text-yellow-200">{stats.growthRate}%</p>
      </div>

      {/* Graphs - Cards with shadow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Customer Growth</h3>
          <Line data={customerGrowthData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Vehicle Growth</h3>
          <Line data={customerGrowthData} />
        </div>
      </div>

      {/* Total Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Total Transactions</h3>
        <Line data={customerGrowthData} />
      </div>
    </div>
  );
}
