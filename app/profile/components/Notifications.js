"use client";

import { useState } from "react";
import {
  FaBell,
  FaCheck,
  FaTrash,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("preferences");
  const [preferences, setPreferences] = useState({
    email: {
      rentalUpdates: true,
      paymentReminders: true,
      promotionalOffers: false,
      systemAlerts: true,
    },
    push: {
      rentalUpdates: true,
      paymentReminders: true,
      promotionalOffers: false,
      systemAlerts: true,
    },
    sms: {
      rentalUpdates: false,
      paymentReminders: true,
      promotionalOffers: false,
      systemAlerts: false,
    },
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "rental",
      title: "Rental Confirmation",
      message: "Your rental for Toyota Camry has been confirmed",
      date: "2024-03-15T10:30:00",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      message: "Payment of ETB2500.00 has been received for your rental",
      date: "2024-03-14T15:45:00",
      read: true,
      priority: "medium",
    },
    {
      id: 3,
      type: "system",
      title: "Profile Update Required",
      message: "Please update your profile information for verification",
      date: "2024-03-13T09:15:00",
      read: false,
      priority: "high",
    },
  ]);

  const handleTogglePreference = (channel, category) => {
    setPreferences((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [category]: !prev[channel][category],
      },
    }));
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "rental":
        return <FaCalendarAlt className="text-blue-500" />;
      case "payment":
        return <FaCheck className="text-green-500" />;
      case "system":
        return <FaInfoCircle className="text-gray-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("preferences")}
          className={`px-4 py-2 font-medium ${
            activeTab === "preferences"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Notification Preferences
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium ${
            activeTab === "history"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Notification History
        </button>
      </div>

      {activeTab === "preferences" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
            <div className="space-y-4">
              {Object.entries(preferences.email).map(([category, enabled]) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <button
                    onClick={() => handleTogglePreference("email", category)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      enabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                        enabled ? "translate-x-6" : "translate-x-2"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Push Notifications</h2>
            <div className="space-y-4">
              {Object.entries(preferences.push).map(([category, enabled]) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <button
                    onClick={() => handleTogglePreference("push", category)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      enabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                        enabled ? "translate-x-6" : "translate-x-2"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">SMS Notifications</h2>
            <div className="space-y-4">
              {Object.entries(preferences.sms).map(([category, enabled]) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <button
                    onClick={() => handleTogglePreference("sms", category)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      enabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                        enabled ? "translate-x-6" : "translate-x-2"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow p-4 ${
                !notification.read ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600">{notification.message}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-gray-500">
                        {new Date(notification.date).toLocaleString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          notification.priority
                        )}`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
