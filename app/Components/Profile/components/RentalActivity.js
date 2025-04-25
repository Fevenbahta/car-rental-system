"use client";

import { useState, useEffect } from "react";
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";

export default function RentalActivity() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "https://subbirr.com/api/rentals/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRentals(response.data);
    } catch (error) {
      console.error("Failed to fetch rentals:", error);
      setError(
        error.response?.data?.message || "Failed to fetch rental history"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center p-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchRentals}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <FaCar className="text-blue-500 text-xl" />
        <h2 className="text-2xl font-semibold">Rental History</h2>
      </div>

      {rentals.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-gray-500">No rental history found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{rental.car.model}</h3>
                  <p className="text-gray-600">{rental.car.make}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    rental.status
                  )}`}
                >
                  {rental.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-500" />
                  <span>
                    {new Date(rental.start_date).toLocaleDateString()} -{" "}
                    {new Date(rental.end_date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>{rental.pickup_location}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-500" />
                  <span>{rental.duration} days</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Total:</span>
                  <span>${rental.total_price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
