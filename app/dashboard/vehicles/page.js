"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomerVerificationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoading(true); // Start loading

    fetch("https://www.carrentalbackend.emareicthub.com/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.users)) {
          const pendingOnly = data.users.filter(
            (user) => user.status === "Pending"
          );

          const customersWithFullNames = pendingOnly.map((customer) => ({
            ...customer,
            name: `${customer.first_name} ${customer.last_name}`,
          }));

          setCustomers(customersWithFullNames);
        } else {
          console.error("Unexpected data format", data);
        }
        setIsLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setIsLoading(false); // End loading on error
      });
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    [customer.name, customer.email, customer.phone]
      .some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleCustomerSelection = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedCustomer) return;

    setIsLoading(true); // Start loading when approval is in progress

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://www.carrentalbackend.emareicthub.com/api/admin/users/${selectedCustomer.id}/verify`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );

      if (res.ok) {
        toast.success(`Customer ${selectedCustomer.name} has been approved!`);
        setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
        setIsModalOpen(false);
      } else {
        toast.error("Approval failed.");
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 p-8">
      <h2 className="text-3xl font-semibold text-blue-800 mb-6">
        Customer Verification
      </h2>
      <p className="text-sm text-gray-600 mb-8">
        Search and verify customers for approval.
      </p>

      <div className="flex gap-4 mb-8">
        <div className="flex items-center space-x-2 border rounded-md p-2 shadow-md w-80">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Show loading indicator when fetching data */}
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full border-4 border-t-4 border-blue-600 w-8 h-8"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-transparent text-sm">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Passport</th>
                <th className="py-3 px-6 text-left">Digital ID</th>
                <th className="py-3 px-6 text-left">Driver License</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="py-3 px-6">{customer.name}</td>
                  <td className="py-3 px-6">{customer.email}</td>
                  <td className="py-3 px-6">{customer.phone}</td>
                  <td className="py-3 px-6">{customer.city}</td>
                  <td className="py-3 px-6">
                    {customer.passport ? (
                      <a
                        href={customer.passport}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {customer.digital_id ? (
                      <a
                        href={customer.digital_id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {customer.driver_liscence ? (
                      <a
                        href={customer.driver_liscence}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-6">{customer.status}</td>
                  <td className="py-3 px-6">
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
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-700 text-white text-center py-4 px-6 rounded-t-2xl">
              <h3 className="text-xl font-semibold">Customer Details</h3>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {[["Name", selectedCustomer.name], ["Email", selectedCustomer.email], ["Phone", selectedCustomer.phone], ["Address", selectedCustomer.address]].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{label}:</span>
                  <span className="text-gray-900">{value || "-"}</span>
                </div>
              ))}

              {[["Passport", selectedCustomer.passport], ["Digital ID", selectedCustomer.digital_id], ["Driver License", selectedCustomer.driver_license]].map(([label, url]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{label}:</span>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Download
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition px-4 py-2 rounded-md text-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-md text-sm"
                onClick={handleApprove}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
