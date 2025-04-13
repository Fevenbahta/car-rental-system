"use client";
import { useRouter } from 'next/navigation';

export default function MainMenu({ currentPath }) {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Payments', path: '/dashboard/payments' },
    { text: 'Vehicles', path: '/dashboard/vehicles' },
    { text: 'Customers', path: '/dashboard/customers' },
    { text: 'Verification', path: '/dashboard/verification' },
    { text: 'Approval', path: '/dashboard/approval' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <ul className="space-y-4">
      {menuItems.map((item) => (
        <li key={item.text}>
          <button
            onClick={() => handleNavigation(item.path)}
            className={`w-full text-left p-3 rounded-md hover:bg-gray-700 ${
              currentPath === item.path // Exact match for /dashboard
                ? 'bg-gray-700'
                : 'bg-gray-800'
            }`}
          >
            {item.text}
          </button>
        </li>
      ))}
    </ul>
  );
}
