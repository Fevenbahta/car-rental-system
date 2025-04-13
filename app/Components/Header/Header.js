export default function Header() {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md">
          Logout
        </button>
      </div>
    );
  }
  