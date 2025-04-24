"use client";

import React, { useState, useEffect } from "react";

import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
import fetchVehicles from "../services/vehicleService"; // Import the service

const vehicles = [
  {
    id:1,
    brand: "Toyota",
    model: "Corolla 2022",
    location: "Addis Ababa",
    rating: 4.5,
    reviews: 120,
    mileage: "15,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "5 Seats",
    price: 2500,
    image: { src: "/car34.jpg" },
    availability: true,
    type: "Sedan",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
  { id:3,
    brand: "Suzuki",
    model: "Swift 2021",
    location: "Mekelle",
    rating: 4.3,
    reviews: 64,
    mileage: "20,000 km",
    transmission: "Manual",
    fuel: "Petrol",
    seats: "4 Seats",
    price: 2000,
    image: { src: "/car39.jpg" },
    availability: false,
    type: "Hatchback",
  },
  { id:2,
    brand: "Hyundai",
    model: "Tucson 2023",
    location: "Bahir Dar",
    rating: 4.7,
    reviews: 89,
    mileage: "10,500 km",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "5 Seats",
    price: 3000,
    image: { src: "/car38.jpg" },
    availability: true,
    type: "SUV",
  },
];

const vehicleGroups = [
  { id: "toyota", name: "Toyota" },
  { id: "hyundai", name: "Hyundai" },
  { id: "suzuki", name: "Suzuki" },
  { id: "automatic", name: "Automatic" },
  { id: "manual", name: "Manual" },
  { id: "diesel", name: "Diesel" },
  { id: "petrol", name: "Petrol" },
  { id: "corolla", name: "Corolla 2022" },
  { id: "tucson", name: "Tucson 2023" },
  { id: "swift", name: "Swift 2021" },
  { id: "sedan", name: "Sedan" },
  { id: "suv", name: "SUV" },
  { id: "hatchback", name: "Hatchback" },
];

const VehicleGroup = () => {
  const [selectedGroups, setSelectedGroups] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [transmissionType, setTransmissionType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [availability, setAvailability] = useState(false);
  const [modelType, setModelType] = useState(""); // for filtering models
  const [carType, setCarType] = useState(""); // for filtering car types
  const [pickupDate, setPickupDate] = useState(""); // for pickup date filter
  const [dropoffDate, setDropoffDate] = useState(""); // for dropoff date filter
  const [pickupLocation, setPickupLocation] = useState(""); // for pickup location filter
  const [dropoffLocation, setDropoffLocation] = useState(""); // for dropoff location filter

  const [isClient, setIsClient] = useState(false); // Adding this state for client-side check

  const searchParams = useSearchParams();
  console.log(searchParams.toString());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const pickup = searchParams.get('pickTime');
      const dropoff = searchParams.get('dropTime');
      const pickupLoc = searchParams.get('pickUp');
      const dropoffLoc = searchParams.get('dropOff');
      const type = searchParams.get('carType');

  
      if (pickup) setPickupDate(pickup);
      if (dropoff) setDropoffDate(dropoff);
      if (pickupLoc) setPickupLocation(pickupLoc);
      if (dropoffLoc) setDropoffLocation(dropoffLoc);

      if (type) setCarType(type.toLowerCase());
    
    }
  }, [isClient, searchParams]);
  
  const toggleGroup = (id) => {
    setSelectedGroups((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };
  
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (selectedGroups.size === 0 && !transmissionType && !fuelType && !availability && !modelType && !carType && !pickupDate && !dropoffDate && !pickupLocation && !dropoffLocation) {
      return true;
    }

    const tags = [
      vehicle.brand.toLowerCase(),
      vehicle.model.toLowerCase(),
      vehicle.transmission.toLowerCase(),
      vehicle.fuel.toLowerCase(),
      vehicle.type.toLowerCase(), // Include car type in the tags
    ];

    const groupFilter = [...selectedGroups].some((groupId) => {
      if (vehicleGroups.some(group => group.id === groupId)) {
        return tags.some(tag => tag.includes(groupId.toLowerCase()));
      }
      return false;
    });

    const priceFilter = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    const transmissionFilter = transmissionType ? vehicle.transmission.toLowerCase() === transmissionType : true;
    const fuelFilter = fuelType ? vehicle.fuel.toLowerCase() === fuelType : true;
    const availabilityFilter = availability ? vehicle.availability === availability : true;
    const modelFilter = modelType ? vehicle.model.toLowerCase().includes(modelType.toLowerCase()) : true;
    const carTypeFilter = carType ? vehicle.type.toLowerCase() === carType.toLowerCase() : true;

    // Add pickup and drop-off location filters
    const pickupLocationFilter = pickupLocation ? vehicle.location.toLowerCase().includes(pickupLocation.toLowerCase()) : true;
    const dropoffLocationFilter = dropoffLocation ? vehicle.location.toLowerCase().includes(dropoffLocation.toLowerCase()) : true;

    return groupFilter && priceFilter && transmissionFilter && fuelFilter && availabilityFilter && modelFilter && carTypeFilter && pickupLocationFilter && dropoffLocationFilter;
  });

  return (
    <div className="text-center px-6 py-40">
      <p className="text-lg text-gray-700 mb-2">Explore Our Fleet</p>
      <h2 className="text-3xl font-bold mb-6">Available Cars</h2>
  
      {/* Filters Section */}
      <div className="p-6 rounded-md mb-10">
        {/* Vehicle Group Filters */}
        <div className="mb-6">
          <div className="flex gap-4 justify-center flex-wrap">
            {vehicleGroups.map((group) => (
              <button
                key={group.id}
                className={`w-full max-w-[160px] rounded-full py-2 px-4 text-[1rem] transition-colors ${
                  selectedGroups.has(group.id)
                    ? "bg-[#1572d3] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => toggleGroup(group.id)}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>
  
        {/* Additional Filters */}
        <div className="flex gap-6 flex-wrap justify-center items-center">
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">
              Price Range: {priceRange[0]} - {priceRange[1]} ETB
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full mb-3"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full"
            />
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Transmission Type</label>
            <select
              onChange={(e) => setTransmissionType(e.target.value)}
              className="w-full border p-2 rounded-md"
            >
              <option value="">All</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Fuel Type</label>
            <select
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full border p-2 rounded-md"
            >
              <option value="">All</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Car Model</label>
            <select
              onChange={(e) => setModelType(e.target.value)}
              className="w-full border p-2 rounded-md"
            >
              <option value="">All</option>
              <option value="corolla">Corolla 2022</option>
              <option value="tucson">Tucson 2023</option>
              <option value="swift">Swift 2021</option>
            </select>
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Car Type</label>
            <select
              onChange={(e) => setCarType(e.target.value)}
              value={carType} // Bind the value to the carType state
              className="w-full border p-2 rounded-md"
            >
              <option value="">All</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="hatchback">Hatchback</option>
            </select>
          </div>
  
          <div className="w-full max-w-[220px] flex items-center bg-gray-200 p-2 rounded-md">
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="mr-2"
            />
            <label>Available Only</label>
          </div>
        </div>
  
        {/* New Filters: Pickup and Drop-off */}
        <div className="flex gap-6 flex-wrap justify-center items-center mt-6">
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Drop-off Date</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Pickup Location</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select Pickup Location</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Bahir Dar">Bahir Dar</option>
              <option value="Gondar">Gondar</option>
              <option value="Mekele">Mekele</option>
            </select>
          </div>
  
          <div className="w-full max-w-[220px] bg-gray-200 p-2 rounded-md">
            <label className="block text-sm mb-2">Drop-off Location</label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select Drop-off Location</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Bahir Dar">Bahir Dar</option>
              <option value="Gondar">Gondar</option>
              <option value="Mekele">Mekele</option>
            </select>
          </div>
        </div>
      </div>
  
      {/* Vehicle Cards */}
      <div className="flex flex-wrap justify-center mt-10 gap-10">
  {filteredVehicles.map((vehicle, index) => (
    <div
      key={index}
      className="flex flex-col basis-1/4 max-w-xs border border-gray-300 rounded-lg shadow-md overflow-hidden"
    >
      <Link href={`/Pages/vehicle-detail/${vehicle.id}`}>
        <div className="w-full h-56">
          <img
            src={vehicle.image.src}
            alt={vehicle.model}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 py-3">
          <h3 className="text-xl font-semibold mb-1">{vehicle.brand}</h3>

          <p className="text-sm text-gray-600 flex justify-center items-center mb-1">
            <i className="fas fa-map-marker-alt mr-2 text-gray-700" />
            {vehicle.location}
          </p>

          <p className="text-sm text-yellow-500 flex justify-center items-center mb-3">
            <i className="fas fa-star mr-1" />
            {vehicle.rating} ({vehicle.reviews})
          </p>

          <hr className="border-t border-gray-300 mb-3" />

          <h4 className="text-lg font-medium mb-4">{vehicle.model}</h4>

          <div className="flex justify-between text-sm text-gray-700 mb-4">
            <div>
              <p className="flex items-center mb-1">
                <i className="fas fa-car mr-2" />
                {vehicle.mileage}
              </p>
              <p className="flex items-center">
                <i className="fas fa-cogs mr-2" />
                {vehicle.transmission}
              </p>
            </div>

            <div>
              <p className="flex items-center mb-1">
                <i className="fas fa-gas-pump mr-2" />
                {vehicle.fuel}
              </p>
              <p className="flex items-center">
                <i className="fas fa-chair mr-2" />
                {vehicle.seats}
              </p>
            </div>
          </div>

          <p className="text-center text-lg font-semibold text-gray-800 mb-3">
            <strong>Price</strong>&nbsp;{vehicle.price} ETB/Day
          </p>

          <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition">
            Rent Now <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </Link>
    </div>
  ))}
</div>

  
    </div>
  );
  
};

export default VehicleGroup;
