import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing the person icon

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown menu
  const buttonRef = useRef(null); // Reference to the button

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    // Handle logout logic (this could trigger a redirect or a logout function)
    console.log("Logging out...");
  };

  const handleChangePassword = () => {
    // Handle password change logic (e.g., redirect to password change page)
    console.log("Redirecting to change password...");
  };

  // Close the dropdown if clicked outside of the dropdown or button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* Person Icon with Dropdown */}
      <div className="relative">
        <button
          ref={buttonRef} // Assign the button reference
          onClick={handleDropdownToggle}
          className="flex items-center space-x-2 bg-blue-900 text-white rounded-full p-2"
        >
          <FaUserCircle className="text-3xl" />
          <span>Profile</span>
        </button>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <div
            ref={dropdownRef} // Assign the dropdown reference
            className="absolute right-0 mt-2 bg-white text-blue-900 rounded-lg shadow-lg w-48"
          >
            <ul className="py-2">
              <li
                onClick={handleChangePassword}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Change Password
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
