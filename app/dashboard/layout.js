"use client";
import MainMenu from '../Components/MainMenu/MainMenu';  // Main menu includes the Sidebar and navigation
import Header from '../Components/Header/Header';      // Optional: Header for top bar (logout, profile)
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed w-50 bg-gradient-to-b from-blue-900 to-black text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Car Rental Sytem</h2>
        <MainMenu currentPath={pathname} />
      </div>

      {/* Main content area */}
      <div className=" ml-60 flex-1 flex flex-col">
        {/* Header */}
        <div className="w-full  text-blue-900 ">
          <Header />
        </div>

        {/* Main content */}
        <div className=" flex-1 px-6 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}