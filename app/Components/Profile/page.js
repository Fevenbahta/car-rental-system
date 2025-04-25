"use client";

import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaCar,
  FaList,
  FaCreditCard,
  FaStar,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";
import BasicInfo from "./components/BasicInfo";
import AccountSecurity from "./components/AccountSecurity";
import RentalActivity from "./components/RentalActivity";
import Listings from "./components/Listings";
import PaymentInfo from "./components/PaymentInfo";
import Reviews from "./components/Reviews";
import Notifications from "./components/Notifications";
import Verification from "./components/Verification";

const tabs = [
  { id: "basic", label: "Basic Info", icon: FaUser },
  { id: "security", label: "Account Security", icon: FaLock },
  { id: "rentals", label: "Rental Activity", icon: FaCar },
  { id: "listings", label: "Listings", icon: FaList },
  { id: "payments", label: "Payments", icon: FaCreditCard },
  { id: "reviews", label: "Reviews", icon: FaStar },
  { id: "notifications", label: "Notifications", icon: FaBell },
  { id: "verification", label: "Verification", icon: FaShieldAlt },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicInfo />;
      case "security":
        return <AccountSecurity />;
      case "rentals":
        return <RentalActivity />;
      case "listings":
        return <Listings />;
      case "payments":
        return <PaymentInfo />;
      case "reviews":
        return <Reviews />;
      case "notifications":
        return <Notifications />;
      case "verification":
        return <Verification />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
