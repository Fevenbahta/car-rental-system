export default function VehiclesPage() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Vehicles</h2>
        <p className="text-gray-700">Manage your fleet of vehicles here.</p>
  
        {/* Sample data */}
        <table className="min-w-full mt-4 border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Vehicle Name</th>
              <th className="py-2 px-4 border-b text-left">Model</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Toyota Corolla</td>
              <td className="py-2 px-4 border-b">2023</td>
              <td className="py-2 px-4 border-b">Available</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Honda Civic</td>
              <td className="py-2 px-4 border-b">2022</td>
              <td className="py-2 px-4 border-b">Rented</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  