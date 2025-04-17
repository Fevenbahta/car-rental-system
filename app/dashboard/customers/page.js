"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetched Token:", token);

        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const response = await fetch("https://www.carrentalbackend.emareicthub.com/api/users", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const data = await response.json();
        console.log("Fetched Customers Data:", data);

        setCustomers(data.users || []);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false); // Set loading to false if there is an error
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.first_name} ${customer.last_name}`;
    const searchMatch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);

    const statusMatch = statusFilter ? customer.status === statusFilter : true;
    const locationMatch = locationFilter ? customer.city === locationFilter : true;

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
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="p-2 text-sm rounded-md bg-gray-100 text-gray-900"
          onChange={(e) => setLocationFilter(e.target.value)}
          value={locationFilter}
        >
          <option value="">All Locations</option>
          {[...new Set(customers.map((c) => c.city).filter(Boolean))].map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="min-w-full bg-transparent text-sm border-collapse">
          <thead>
            <tr className="text-blue-900">
              <th className="py-2 px-2 border-b border-gray-300">Customer Name</th>
              <th className="py-2 px-2 border-b border-gray-300">Email</th>
              <th className="py-2 px-2 border-b border-gray-300">Phone</th>
              <th className="py-2 px-2 border-b border-gray-300">Status</th>
              <th className="py-2 px-2 border-b border-gray-300">Date Registered</th>
              <th className="py-2 px-2 border-b border-gray-300">Role</th>
              <th className="py-2 px-2 border-b border-gray-300">City</th>
              <th className="py-2 px-2 border-b border-gray-300">Address</th>
              <th className="py-2 px-2 border-b border-gray-300">Birth Date</th>
              <th className="py-2 px-2 border-b border-gray-300">Driver License</th>
              <th className="py-2 px-2 border-b border-gray-300">Digital ID</th>
              <th className="py-2 px-2 border-b border-gray-300">Passport</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                <td className="py-2 px-2 border-b border-gray-300">
                  {customer.first_name} {customer.last_name}
                </td>
                <td className="py-2 px-2 border-b border-gray-300">{customer.email}</td>
                <td className="py-2 px-2 border-b border-gray-300">{customer.phone}</td>
                <td className="py-2 px-2 border-b border-gray-300">{customer.status}</td>
                <td className="py-2 px-2 border-b border-gray-300">{new Date(customer.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-2 border-b border-gray-300">{customer.role}</td>
                <td className="py-2 px-2 border-b border-gray-300">{customer.city}</td>
                <td className="py-2 px-2 border-b border-gray-300">{customer.address || "N/A"}</td>
                <td className="py-2 px-2 border-b border-gray-300">
                  {customer.birth_date ? new Date(customer.birth_date).toLocaleDateString() : "N/A"}
                </td>
                <td className="py-2 px-2 border-b border-gray-300">
                  {customer.driver_liscence ? (
                    <a
                      href={customer.driver_liscence}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : "N/A"}
                </td>
                <td className="py-2 px-2 border-b border-gray-300">
                  {customer.digital_id ? (
                    <a
                      href={customer.digital_id}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : "N/A"}
                </td>
                <td className="py-2 px-2 border-b border-gray-300">
                  {customer.passport ? (
                    <a
                      href={customer.passport}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
