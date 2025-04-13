"use client";
import MainMenu from '../Components/MainMenu/MainMenu';  // Main menu includes the Sidebar and navigation
import Header from '../Components/Header/Header';      // Optional: Header for top bar (logout, profile)
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Car Rent</h2>
        <MainMenu currentPath={pathname} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}