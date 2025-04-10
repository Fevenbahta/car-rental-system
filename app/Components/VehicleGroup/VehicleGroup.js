"use client"
import Image from 'next/image';
import { useState } from 'react';
import benz from "../images/benz.jpg"
import audia from "../images/audia1.jpg"
import bmw320 from "../images/bmw320.jpg"
import golf6 from "../images/golf6.jpg"

function SelectVehicle() {
  const vehicleGroups = [
    { id: 1, name: "All Vehicles" },
    { id: 2, name: "Economy" },
    { id: 3, name: "Compact" },
    { id: 4, name: "Mid-size" },
    { id: 5, name: "Full-size" },
    { id: 6, name: "Luxury" },
    { id: 7, name: "SUV" },
    { id: 8, name: "Minivan" },
    { id: 9, name: "Convertible" },
    { id: 10, name: "Truck" },
    { id: 11, name: "Electric" },
    { id: 12, name: "Hybrid" },
  ];

  const cars = [
    {
      id: 1,
      name: "Mercedes-Benz E-Class",
      type: "Luxury",
      price: 250,
      image: benz,
      rating: 4.0,
      reviews: 1354,
      features: ["4 passengers", "Auto", "Air conditioner", "4 doors"],
      category: [6] // Luxury
    },
    {
      id: 2,
      name: "Toyota Corolla",
      type: "Compact",
      price: 120,
      image: bmw320,
      rating: 4.2,
      reviews: 2456,
      features: ["5 passengers", "Auto", "Air conditioner", "4 doors"],
      category: [3] // Compact
    },
    {
      id: 3,
      name: "Tesla Model 3",
      type: "Electric",
      price: 180,
      image: golf6,
      rating: 4.5,
      reviews: 1890,
      features: ["5 passengers", "Auto", "Electric", "4 doors"],
      category: [11] // Electric
    },
    {
      id: 4,
      name: "Ford Explorer",
      type: "SUV",
      price: 200,
      image: audia,
      rating: 4.1,
      reviews: 1120,
      features: ["7 passengers", "Auto", "4WD", "Air conditioner"],
      category: [7] // SUV
    },
    {
        id: 5,
        name: "Toyota Corolla",
        type: "Compact",
        price: 120,
        image: bmw320,
        rating: 4.2,
        reviews: 2456,
        features: ["5 passengers", "Auto", "Air conditioner", "4 doors"],
        category: [3] // Compact
      },
      {
        id: 6,
        name: "Tesla Model 3",
        type: "Electric",
        price: 180,
        image: golf6,
        rating: 4.5,
        reviews: 1890,
        features: ["5 passengers", "Auto", "Electric", "4 doors"],
        category: [11] // Electric
      },
      
  ];

  const [selectedGroups, setSelectedGroups] = useState(new Set([1])); 

  const toggleGroup = (groupId) => {
    const newSelection = new Set(selectedGroups);
    
    if (groupId === 1) {
      if (newSelection.has(1)) {
        newSelection.clear();
      } else {
        newSelection.clear();
        newSelection.add(1);
      }
    } else {
      newSelection.delete(1);
      
      if (newSelection.has(groupId)) {
        newSelection.delete(groupId);
      } else {
        newSelection.add(groupId);
      }
    }

    if (newSelection.size === 0) {
      newSelection.add(1);
    }

    setSelectedGroups(newSelection);
  };

  const filteredCars = cars.filter(car => 
    selectedGroups.has(1) || car.category.some(cat => selectedGroups.has(cat))
  );


  return (
    <div className="container mx-auto" >
      <div className="w-full">
        <div className="pb-5">
          <h1 className="text-3xl py-3 pb-7 text-center font-bold">Select Vehicle Groups</h1>
           
          <div className="grid grid-cols-2 w-full justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {vehicleGroups.map((group) => (
              <button
                key={group.id}
                className={`w-full rounded-full py-2 px-4 text-[1rem] transition-colors ${
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

          <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 lg:grid-cols-3  gap-12">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg  overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image 
                    src={car.image} 
                    alt={car.name}
                    layout="fill"
                    
                    objectFit="cover"
                    className="w-[100px]"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-lg font-semibold">{car.name}</h2>
                      <p className="text-gray-500 text-sm">{car.type}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-[#1572d3]">{car.price} ETB</h3>
                      <p className="text-gray-500 text-xs">per day</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-yellow-500 text-sm">★ {car.rating} ({car.reviews} reviews)</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      {car.features.map((feature, index) => (
                        <p key={index}>{feature}</p>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-[#1572d3] text-white py-2 rounded-md hover:bg-[#125fb8] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectVehicle;