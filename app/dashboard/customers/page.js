export default function CustomersPage() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Customers</h2>
        <p className="text-gray-700">View and manage customer details here.</p>
  
        {/* Sample data */}
        <table className="min-w-full mt-4 border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Customer Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">John Doe</td>
              <td className="py-2 px-4 border-b">john@example.com</td>
              <td className="py-2 px-4 border-b">123-456-7890</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Jane Smith</td>
              <td className="py-2 px-4 border-b">jane@example.com</td>
              <td className="py-2 px-4 border-b">987-654-3210</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  