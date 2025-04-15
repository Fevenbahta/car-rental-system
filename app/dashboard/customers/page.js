"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // For Search Icon

export default function CustomersPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample customer data
  const customers = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "Active",
      dateRegistered: "2024-01-10",
      bookingScore: 85,
      location: "New York",
      nationalId: "NY123456789",
      passport: "P123456789",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      status: "Inactive",
      dateRegistered: "2023-12-15",
      bookingScore: 90,
      location: "California",
      nationalId: "CA987654321",
      passport: "P987654321",
    },
    // Add more customers here
  ];

  // Filtering customers based on the search and filters
  const filteredCustomers = customers.filter((customer) => {
    const searchMatch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const statusMatch = statusFilter ? customer.status === statusFilter : true;
    const locationMatch = locationFilter ? customer.location === locationFilter : true;

    return searchMatch && statusMatch && locationMatch;
  });

  return (
    <div className="bg-white min-h-screen text-gray-900 p-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Customers</h2>
      <p className="text-sm text-gray-600 mb-6">View and manage customer details here.</p>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            className="p-2 text-sm rounded-md bg-gray-100 text-gray-900 placeholder-gray-400 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="p-2 text-sm rounded-md bg-gray-100 text-gray-900"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          className="p-2 text-sm rounded-md bg-gray-100 text-gray-900"
          onChange={(e) => setLocationFilter(e.target.value)}
          value={locationFilter}
        >
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="California">California</option>
        </select>
      </div>

      {/* Customer Table */}
      <table className="min-w-full bg-transparent text-sm border-collapse">
        <thead>
          <tr className="text-blue-900">
            <th className="py-2 px-4 border-b border-gray-300">Customer Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300">Phone</th>
            <th className="py-2 px-4 border-b border-gray-300">Status</th>
            <th className="py-2 px-4 border-b border-gray-300">Date Registered</th>
            <th className="py-2 px-4 border-b border-gray-300">Booking Score</th>
            <th className="py-2 px-4 border-b border-gray-300">Location</th>
            <th className="py-2 px-4 border-b border-gray-300">National ID</th>
            <th className="py-2 px-4 border-b border-gray-300">Passport</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
            >
              <td className="py-2 px-4 border-b border-gray-300">{customer.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.email}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.phone}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.status}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.dateRegistered}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.bookingScore}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.location}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.nationalId}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.passport}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
