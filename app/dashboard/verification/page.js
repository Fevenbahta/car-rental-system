"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // For Search Icon

export default function CustomerVerificationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample customer data
  const customers = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "Pending",
      location: "New York",
      nationalId: "NY123456789",
      passport: "P123456789",
      files: ["File 1", "File 2"], // Example files
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      status: "Pending",
      location: "California",
      nationalId: "CA987654321",
      passport: "P987654321",
      files: ["File 3", "File 4"], // Example files
    },
    // Add more customers here
  ];

  // Filtering customers based on the search term
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
  });

  const handleCustomerSelection = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    // Perform approval action
    alert(`Customer ${selectedCustomer.name} has been approved!`);
    setIsModalOpen(false); // Close the modal after approval
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 p-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Customer Verification</h2>
      <p className="text-sm text-gray-600 mb-6">Search and verify customers for approval.</p>

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
      </div>

      {/* Customer Table */}
      <table className="min-w-full bg-transparent text-sm border-collapse">
        <thead>
          <tr className="text-blue-900">
            <th className="py-2 px-4 border-b border-gray-300">Customer Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300">Phone</th>
            <th className="py-2 px-4 border-b border-gray-300">Location</th>
            <th className="py-2 px-4 border-b border-gray-300">Status</th>
            <th className="py-2 px-4 border-b border-gray-300">Action</th>
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
              <td className="py-2 px-4 border-b border-gray-300">{customer.location}</td>
              <td className="py-2 px-4 border-b border-gray-300">{customer.status}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                  onClick={() => handleCustomerSelection(customer)}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom Modal for Customer Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-96 mx-auto overflow-auto">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
              Customer Details
            </h3>
            {selectedCustomer && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="font-semibold">Name:</p>
                  <p>{selectedCustomer.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Email:</p>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Phone:</p>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Location:</p>
                  <p>{selectedCustomer.location}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">National ID:</p>
                  <p>{selectedCustomer.nationalId}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Passport:</p>
                  <p>{selectedCustomer.passport}</p>
                </div>
                <div>
                  <strong className="block">Files:</strong>
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedCustomer.files.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
                onClick={() => setIsModalOpen(false)} // Close modal
              >
                Close
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                onClick={handleApprove} // Approve customer
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
