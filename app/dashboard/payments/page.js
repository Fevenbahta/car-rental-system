"use client";
import { useState } from "react";

export default function PaymentsPage() {
  const initialData = [
    { customer: "John Doe", amount: 200, status: "Paid", date: "2025-04-13", vehicle: "Toyota Corolla" },
    { customer: "Jane Smith", amount: 150, status: "Pending", date: "2025-04-10", vehicle: "Honda Civic" },
    { customer: "Mark Lee", amount: 250, status: "Paid", date: "2025-04-05", vehicle: "Ford Mustang" },
    { customer: "Emily Davis", amount: 300, status: "Paid", date: "2025-04-02", vehicle: "BMW X5" },
    { customer: "Chris Brown", amount: 180, status: "Pending", date: "2025-04-01", vehicle: "Chevrolet Camaro" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredData(
      initialData.filter(
        (payment) =>
          payment.customer.toLowerCase().includes(query.toLowerCase()) ||
          payment.status.toLowerCase().includes(query.toLowerCase()) ||
          payment.vehicle.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handlePrint = () => {
    const printContents = document.getElementById("payment-table").outerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleExport = () => {
    const csvData = [
      ["Customer", "Vehicle", "Amount", "Status", "Date"],
      ...filteredData.map((item) => [item.customer, item.vehicle, item.amount, item.status, item.date]),
    ];

    const csvFile = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvFile], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payment_report.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">Payments</h2>
      <p className="text-gray-700 mb-4">Manage your car rental payments here.</p>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 w-1/3 border border-gray-300 rounded-lg"
          placeholder="Search by Customer, Status, or Vehicle"
        />
        <div>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mr-2"
          >
            Print Statement
          </button>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Export to CSV
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <table id="payment-table" className="min-w-full mt-4 border border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Customer</th>
            <th className="py-2 px-4 border-b text-left">Vehicle</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                No payments found.
              </td>
            </tr>
          ) : (
            filteredData.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{payment.customer}</td>
                <td className="py-2 px-4 border-b">{payment.vehicle}</td>
                <td className="py-2 px-4 border-b">${payment.amount}</td>
                <td className="py-2 px-4 border-b">{payment.status}</td>
                <td className="py-2 px-4 border-b">{payment.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
