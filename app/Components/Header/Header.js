"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Notifications from "../Notifications/Notifications";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Notifications />

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <FaUser className="h-6 w-6" />
            <span>Profile</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
