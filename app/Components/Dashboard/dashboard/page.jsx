"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function DashboardPage() {
  // Sample data for the dashboard
  const [data, setData] = useState({
    totalCustomers: 120,
    totalVehicles: 35,
    verifiedCustomers: 100,
    totalTransactions: 25000,
    growthRate: 15, // Growth rate in percentage
  });

  // Data for the charts
  const customersData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Customers Growth",
        data: [50, 60, 70, 90, 100, 110, 120],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const vehiclesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Vehicles Growth",
        data: [10, 12, 15, 20, 25, 30, 35],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const transactionsData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Transactions",
        data: [2000, 3000, 5000, 7000, 9000, 11000, 13000],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  // Handle updating data (for demonstration purposes)
  useEffect(() => {
    setTimeout(() => {
      setData({
        totalCustomers: 130,  // Simulate a change
        totalVehicles: 40,
        verifiedCustomers: 120,
        totalTransactions: 27000,
        growthRate: 20,
      });
    }, 5000);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Stats Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Total Customers</h3>
          <p className="text-4xl font-bold">{data.totalCustomers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Verified Customers</h3>
          <p className="text-4xl font-bold">{data.verifiedCustomers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Total Vehicles</h3>
          <p className="text-4xl font-bold">{data.totalVehicles}</p>
        </div>
      </div>

      {/* Growth Rate Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Growth Rate</h3>
        <p className="text-4xl font-bold text-green-600">{data.growthRate}%</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customers Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Customers Growth</h3>
          <Line data={customersData} />
        </div>

        {/* Vehicles Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Vehicles Growth</h3>
          <Line data={vehiclesData} />
        </div>
      </div>

      {/* Total Transactions Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Total Transactions</h3>
        <Line data={transactionsData} />
      </div>
    </div>
  );
}
