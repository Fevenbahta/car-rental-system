
"use client"
import { useState } from "react";

export default function AccountPage() {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdmin = { name, email, phone, role };
    setAdmins([...admins, newAdmin]);
    // Clear form inputs
    setName("");
    setEmail("");
    setPhone("");
    setRole("admin");
  };

  const handleDelete = (index) => {
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-dark-card rounded-lg shadow-lg">
      {/* Admin Creation Form */}
      <section className="mb-8">
        <h2 className="text-blue text-2xl font-bold mb-4">Create Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-light-gray">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-dark-bg text-light-gray border border-dark-gray rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-light-gray">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-dark-bg text-light-gray border border-dark-gray rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-light-gray">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-dark-bg text-light-gray border border-dark-gray rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-light-gray">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-dark-bg text-light-gray border border-dark-gray rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          >
            Create Admin
          </button>
        </form>
      </section>

      {/* Admin List Table */}
      <section>
        <h2 className="text-blue text-2xl font-bold mb-4">Admin List</h2>
        <table className="w-full table-auto text-light-gray">
          <thead>
            <tr className="text-sm font-semibold border-b border-dark-gray">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="border-b border-dark-gray hover:bg-dark-gray">
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{admin.phone}</td>
                <td className="px-4 py-2">{admin.role}</td>
                <td className="px-4 py-2 text-red-500 cursor-pointer" onClick={() => handleDelete(index)}>
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
