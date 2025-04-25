"use client";

import { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaHistory,
  FaMoneyBillWave,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

export default function PaymentInfo() {
  const [activeTab, setActiveTab] = useState("payment");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-03-15",
      description: "Car Rental - Toyota Camry",
      amount: 250.0,
      type: "payment",
      status: "completed",
    },
    {
      id: 2,
      date: "2025-03-10",
      description: "Car Rental - Honda Civic",
      amount: 200.0,
      type: "payment",
      status: "completed",
    },
    {
      id: 3,
      date: "2025-03-05",
      description: "Security Deposit Refund",
      amount: -100.0,
      type: "refund",
      status: "completed",
    },
  ]);

  const [payoutSettings, setPayoutSettings] = useState({
    bankAccount: {
      accountNumber: "****1234",
      routingNumber: "****5678",
      accountType: "checking",
    },
    payoutSchedule: "weekly",
    lastPayout: {
      date: "2025-03-10",
      amount: 500.0,
    },
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "https://subbirr.com/api/payment-methods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPaymentMethods(response.data);
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
      setError(
        error.response?.data?.message || "Failed to fetch payment methods"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = () => {
    // Add payment method logic here
    console.log("Adding new payment method");
  };

  const handleDeletePaymentMethod = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://subbirr.com/api/payment-methods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({
        type: "success",
        text: "Payment method deleted successfully",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchPaymentMethods();
    } catch (error) {
      console.error("Failed to delete payment method:", error);
      setError(
        error.response?.data?.message || "Failed to delete payment method"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = (id) => {
    // Implement set default logic
    console.log("Setting default payment method:", id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "payment":
        return <FaCreditCard className="text-blue-500" />;
      case "refund":
        return <FaMoneyBillWave className="text-green-500" />;
      default:
        return <FaHistory className="text-gray-500" />;
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
            onClick={fetchPaymentMethods}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {[
          { id: "payment", label: "Payment Methods", icon: <FaCreditCard /> },
          { id: "history", label: "Billing History", icon: <FaHistory /> },
          { id: "payout", label: "Payout Settings", icon: <FaMoneyBillWave /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Payment Methods */}
      {activeTab === "payment" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Payment Methods</h2>
            <button
              onClick={handleAddPaymentMethod}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus />
              <span>Add Payment Method</span>
            </button>
          </div>

          {message.text && (
            <div
              className={`mb-4 p-4 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {method.card_type} ending in {method.last_four}
                    </h3>
                    <p className="text-gray-500">
                      Expires {method.expiry_month}/{method.expiry_year}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Billing History */}
      {activeTab === "history" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Billing History</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span>{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payout Settings */}
      {activeTab === "payout" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Payout Settings</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Bank Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="font-medium">
                      {payoutSettings.bankAccount.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Routing Number</p>
                    <p className="font-medium">
                      {payoutSettings.bankAccount.routingNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium capitalize">
                      {payoutSettings.bankAccount.accountType}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Payout Schedule</h3>
                <p className="capitalize">
                  {payoutSettings.payoutSchedule} payouts
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Last Payout</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(
                        payoutSettings.lastPayout.date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">
                      ${payoutSettings.lastPayout.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="text-blue-500 hover:text-blue-600">
                  Update Bank Account Information
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
