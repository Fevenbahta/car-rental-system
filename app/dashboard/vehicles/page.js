"use client";

import { useState } from "react";
import {
  FaCar,
  FaCalendarAlt,
  FaStar,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
} from "react-icons/fa";

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState({
    make: "",
    model: "",
    location: "",
    priceRange: "",
    status: "all",
  });

  const [activeTab, setActiveTab] = useState("all");

  // Enhanced sample data for vehicles
  const [vehicles] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2022,
      image: "/car1.jpg",
      location: "New York",
      price: 80,
      status: "available",
      rating: 4.8,
      reviews: 45,
      features: ["Automatic", "Air Conditioning", "Bluetooth", "Backup Camera"],
      owner: {
        name: "John Doe",
        avatar: "/profile-avatar.jpg",
        rating: 4.9,
      },
    },
    {
      id: 2,
      make: "Honda",
      model: "CR-V",
      year: 2023,
      image: "/car2.jpg",
      location: "California",
      price: 90,
      status: "rented",
      rating: 4.7,
      reviews: 38,
      features: ["Automatic", "Air Conditioning", "GPS", "Child Seats"],
      owner: {
        name: "Jane Smith",
        avatar: "/profile-avatar.jpg",
        rating: 4.8,
      },
    },
    {
      id: 3,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      image: "/car3.jpg",
      location: "Texas",
      price: 120,
      status: "maintenance",
      rating: 4.9,
      reviews: 52,
      features: ["Electric", "Autopilot", "Premium Sound", "Wireless Charging"],
      owner: {
        name: "Mike Johnson",
        avatar: "/profile-avatar.jpg",
        rating: 4.7,
      },
    },
  ]);

  // Filter vehicles based on search criteria and active tab
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      (searchTerm.make === "" ||
        vehicle.make.toLowerCase().includes(searchTerm.make.toLowerCase())) &&
      (searchTerm.model === "" ||
        vehicle.model.toLowerCase().includes(searchTerm.model.toLowerCase())) &&
      (searchTerm.location === "" ||
        vehicle.location
          .toLowerCase()
          .includes(searchTerm.location.toLowerCase())) &&
      (searchTerm.priceRange === "" ||
        vehicle.price <= parseInt(searchTerm.priceRange));

    const matchesTab = activeTab === "all" || vehicle.status === activeTab;

    return matchesSearch && matchesTab;
  });

  // Calculate statistics
  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "available").length,
    rented: vehicles.filter((v) => v.status === "rented").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
    averageRating: (
      vehicles.reduce((sum, v) => sum + v.rating, 0) / vehicles.length
    ).toFixed(1),
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 p-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-900">
            Total Vehicles
          </h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-900">Available</h3>
          <p className="text-3xl font-bold">{stats.available}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-yellow-900">Rented</h3>
          <p className="text-3xl font-bold">{stats.rented}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-900">Avg. Rating</h3>
          <p className="text-3xl font-bold">{stats.averageRating}</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-900 mb-4">
          Search Vehicles
        </h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center flex-1 min-w-[200px]">
            <FaCar className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Make"
              value={searchTerm.make}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, make: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center flex-1 min-w-[200px]">
            <FaCar className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Model"
              value={searchTerm.model}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, model: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center flex-1 min-w-[200px]">
            <FaMapMarkerAlt className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Location"
              value={searchTerm.location}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, location: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center flex-1 min-w-[200px]">
            <select
              value={searchTerm.priceRange}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, priceRange: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">All Prices</option>
              <option value="50">Under $50</option>
              <option value="100">Under $100</option>
              <option value="150">Under $150</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`pb-2 px-4 ${
              activeTab === "all"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Vehicles
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "available"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "rented"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("rented")}
          >
            Rented
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "maintenance"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("maintenance")}
          >
            Maintenance
          </button>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out duration-300"
            >
              <div className="relative h-48 mb-4">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                  <span className="text-lg font-semibold">
                    ${vehicle.price}
                  </span>
                  <span className="text-sm text-gray-500">/day</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </h3>
                  <div className="flex items-center mt-1">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{vehicle.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{vehicle.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({vehicle.reviews} reviews)
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === "available"
                        ? "bg-green-100 text-green-800"
                        : vehicle.status === "rented"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.status.charAt(0).toUpperCase() +
                      vehicle.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <FaCogs className="mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center pt-4 border-t border-gray-200">
                  <img
                    src={vehicle.owner.avatar}
                    alt={vehicle.owner.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-medium">{vehicle.owner.name}</p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 text-xs mr-1" />
                      <span className="text-xs text-gray-500">
                        {vehicle.owner.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No vehicles match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
