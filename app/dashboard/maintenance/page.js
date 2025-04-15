"use client";

import { useState } from "react";
import {
  FaCar,
  FaTools,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState({
    vehicle: "",
    status: "all",
    date: "",
    type: "",
  });

  const [activeTab, setActiveTab] = useState("all");

  // Sample maintenance data
  const [maintenanceRecords] = useState([
    {
      id: 1,
      vehicle: {
        make: "Toyota",
        model: "Camry",
        year: 2022,
        image: "/car1.jpg",
        mileage: 25000,
      },
      type: "Routine Service",
      status: "scheduled",
      date: "2025-04-15",
      description: "Regular oil change and inspection",
      priority: "medium",
      cost: 120.0,
      technician: "John Smith",
      notes: "Needs new air filter",
    },
    {
      id: 2,
      vehicle: {
        make: "Honda",
        model: "CR-V",
        year: 2023,
        image: "/car2.jpg",
        mileage: 15000,
      },
      type: "Repair",
      status: "in-progress",
      date: "2025-04-10",
      description: "Brake system inspection and repair",
      priority: "high",
      cost: 350.0,
      technician: "Mike Johnson",
      notes: "Front brake pads need replacement",
    },
    {
      id: 3,
      vehicle: {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        image: "/car3.jpg",
        mileage: 5000,
      },
      type: "Software Update",
      status: "completed",
      date: "2025-04-05",
      description: "System software update and calibration",
      priority: "low",
      cost: 0.0,
      technician: "Sarah Lee",
      notes: "Update completed successfully",
    },
  ]);

  // Filter maintenance records
  const filteredRecords = maintenanceRecords.filter((record) => {
    const matchesSearch =
      (searchTerm.vehicle === "" ||
        `${record.vehicle.make} ${record.vehicle.model}`
          .toLowerCase()
          .includes(searchTerm.vehicle.toLowerCase())) &&
      (searchTerm.date === "" || record.date.includes(searchTerm.date)) &&
      (searchTerm.type === "" ||
        record.type.toLowerCase().includes(searchTerm.type.toLowerCase()));

    const matchesTab = activeTab === "all" || record.status === activeTab;

    return matchesSearch && matchesTab;
  });

  // Calculate statistics
  const stats = {
    total: maintenanceRecords.length,
    scheduled: maintenanceRecords.filter((r) => r.status === "scheduled")
      .length,
    inProgress: maintenanceRecords.filter((r) => r.status === "in-progress")
      .length,
    completed: maintenanceRecords.filter((r) => r.status === "completed")
      .length,
    totalCost: maintenanceRecords.reduce((sum, r) => sum + r.cost, 0),
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 p-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-900">Total Records</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-yellow-900">In Progress</h3>
          <p className="text-3xl font-bold">{stats.inProgress}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-900">Completed</h3>
          <p className="text-3xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-900">Total Cost</h3>
          <p className="text-3xl font-bold">${stats.totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-blue-900 mb-4">
          Search Maintenance Records
        </h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center flex-1 min-w-[200px]">
            <FaCar className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by Vehicle"
              value={searchTerm.vehicle}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, vehicle: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center flex-1 min-w-[200px]">
            <FaCalendarAlt className="text-blue-600" />
            <input
              type="date"
              placeholder="Search by Date"
              value={searchTerm.date}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, date: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex items-center flex-1 min-w-[200px]">
            <FaTools className="text-blue-600" />
            <select
              value={searchTerm.type}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, type: e.target.value })
              }
              className="ml-2 p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">All Types</option>
              <option value="routine">Routine Service</option>
              <option value="repair">Repair</option>
              <option value="software">Software Update</option>
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
            All Records
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "scheduled"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("scheduled")}
          >
            Scheduled
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "in-progress"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("in-progress")}
          >
            In Progress
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "completed"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="space-y-6">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Vehicle Info */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-32 rounded-lg overflow-hidden">
                    <img
                      src={record.vehicle.image}
                      alt={`${record.vehicle.make} ${record.vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Record Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">
                        {record.vehicle.make} {record.vehicle.model} (
                        {record.vehicle.year})
                      </h3>
                      <p className="text-sm text-gray-500">
                        Mileage: {record.vehicle.mileage.toLocaleString()} miles
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm mt-2 ${getPriorityColor(
                          record.priority
                        )}`}
                      >
                        {record.priority.charAt(0).toUpperCase() +
                          record.priority.slice(1)}{" "}
                        Priority
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <FaTools className="text-gray-400 mr-2" />
                      <span className="font-medium">{record.type}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span>Date: {record.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaExclamationTriangle className="text-gray-400 mr-2" />
                      <span>Description: {record.description}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-gray-400 mr-2" />
                      <span>Technician: {record.technician}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {record.notes}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Cost:</span> $
                      {record.cost.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No maintenance records match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
