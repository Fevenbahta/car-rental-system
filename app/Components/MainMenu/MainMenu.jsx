"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaTachometerAlt,
  FaCar,
  FaUsers,
  FaCheckCircle,
  FaTools,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserCog,
  FaCogs,
  FaHeadset,
  FaClipboardCheck,
} from 'react-icons/fa';

// Sidebar Menu Component
const MainMenu = ({ currentPath }) => {
  const router = useRouter();

  const mainMenuItems = [
    { text: 'Dashboard', path: '/Components/Dashboard', icon: <FaTachometerAlt /> },
    { text: 'Bookings', path: '/Components/Dashboard/bookings', icon: <FaClipboardList /> },
    { text: 'Payments', path: '/Components/Dashboard/payments', icon: <FaMoneyBillWave /> },
    { text: 'Vehicles', path: '/Components/Dashboard/vehicles', icon: <FaCar /> },
    { text: 'Customers', path: '/Components/Dashboard/customers', icon: <FaUsers /> },
    { text: 'Verification', path: '/Components/Dashboard/verification', icon: <FaClipboardCheck /> },
    { text: 'Approval', path: '/Components/Dashboard/approval', icon: <FaCheckCircle /> },
    { text: 'Maintenance', path: '/Components/Dashboard/maintenance', icon: <FaTools /> },
    { text: 'Support Tickets', path: '/Components/Dashboard/support', icon: <FaHeadset /> },
    { text: 'Account Settings', path: '/Components/Dashboard/settings/account', icon: <FaUserCog /> },
    { text: 'System Config', path: '/Components/Dashboard/settings/system', icon: <FaCogs /> },
  ];
  

  const settingsMenuItems = [
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-4">
      <ul className="space-y-3">
      {mainMenuItems.map((item) => (
  <li key={item.text}>
    <button
      onClick={() => handleNavigation(item.path)}
      className={`w-full text-left p-2 flex items-center gap-2 rounded-md transition-all duration-200 ${
        currentPath === item.path
          ? 'bg-blue-800'
          : 'hover:bg-blue-800 bg-transparent'
      }`}
    >
      <span className="text-lg">{item.icon}</span>
      {item.text}
    </button>
  </li>
))}

      </ul>

      <div className="border-t border-blue-700 my-6"></div>

      <ul className="space-y-3">
        {settingsMenuItems.map((item) => (
          <li key={item.text}>
            <button
              onClick={() => handleNavigation(item.path)}
              className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                currentPath === item.path
                  ? 'bg-blue-800'
                  : 'hover:bg-blue-600 bg-transparent'
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Header Component
const Header = ({ onDropdownClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

    </div>
  );
};

// Main Layout Component
const DashboardLayout = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState("/Components/Dashboard");
  const handleDropdownClick = (action) => {
    if (action === "logout") {
      // Implement your logout logic here
      alert("Logging out...");
    } else if (action === "changePassword") {
      // Implement your change password logic here
      alert("Changing password...");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 h-screen  to-black text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Car Rent</h2>
        <MainMenu currentPath={selectedPage} />
      </div>

    </div>
  );
};

export default MainMenu;
