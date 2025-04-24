"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  FaCogs,
  FaGasPump,
  FaDoorOpen,
  FaSnowflake,
  FaUsers,
  FaRoad,
  FaCheckCircle,
} from "react-icons/fa";
import ImageModal from "../../../Components/Modal/ImageModal";

const Navbar = dynamic(() => import("../../../Components/Navbar/Navbar.jsx"));
const Footer = dynamic(() => import("../../../Components/Footer/Footer.jsx"));
const Download = dynamic(() => import("../../../Components/Download/Download.jsx"));

const VehicleDetailPage = ({ params }) => {
  const { id } = params;

  const vehicle = {
    name: "2022 Toyota Corolla",
    price: "$20,000",
    description:
      "A reliable and fuel-efficient sedan, perfect for daily commuting.",
    mainImage: "/car38.jpg",
    additionalImages: ["/car38.jpg", "/car38.jpg", "/car38.jpg"],
    specs: [
      { icon: <FaCogs />, label: "Gearbox", value: "Automatic" },
      { icon: <FaGasPump />, label: "Fuel", value: "Petrol" },
      { icon: <FaDoorOpen />, label: "Doors", value: "2" },
      { icon: <FaSnowflake />, label: "AC", value: "Yes" },
      { icon: <FaUsers />, label: "Seats", value: "5" },
      { icon: <FaRoad />, label: "Distance", value: "500 km" },
    ],
    equipment: ["Airbag", "ABS", "Cruise Control", "Bluetooth", "Rear Camera"],
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  

  // Open modal with clicked image
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar className="bg-[#1572D3] bg-opacity-80" />
      <div className="text-center bg white text-gray-800 mt-24 py-12 rounded-lg">
        <h1 className="text-4xl font-bold mb-2 text-[#1572D3]">Vehicle Showcase</h1>
        <p className="text-lg text-gray-600 italic">Explore details of your favorite car before renting</p>
      </div>

      <div className="max-w-screen-2xl mx-auto mb-20">
        {/* Card Container */}
        <div className="bg-white rounded-lg border border-gray-50 px-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{vehicle.name}</h2>
              <p className="text-3xl font-bold text-[#1572D3] mb-4">{vehicle.price}</p>

              <img
  src={vehicle.mainImage}
  alt="Main Vehicle"
  className="w-full rounded-lg shadow-md mb-4 cursor-pointer"
  onClick={() => {
    setSelectedImage(vehicle.mainImage);
    setModalOpen(true);
  }}
/>

<div className="flex gap-2">
  {vehicle.additionalImages.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`Additional view ${index + 1}`}
      className="w-1/3 h-1/2 rounded-lg shadow-sm cursor-pointer"
      onClick={() => {
        setSelectedImage(img);
        setModalOpen(true);
      }}
    />
  ))}
</div>

            </div>

            {/* Right Column */}
            <div className="md:w-1/2 space-y-6 mt-10 ml-10 p-10">
              {/* Technical Specs */}
              <h3 className="text-xl font-semibold mt-2 text-gray-600">Technical Specifications</h3>
              <div className="grid grid-cols-3 gap-20 py-5">
                {vehicle.specs.map((spec, index) => (
                  <div key={index} className="flex flex-col items-center text-center text-[#1572D3]">
                    <div className="text-2xl">{spec.icon}</div>
                    <span className="font-semibold">{spec.label}</span>
                    <span className="text-sm text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Rent Car Button */}
              <div>
                <button className="w-1/2 bg-[#1572D3] text-white py-2 px-4 my-5 rounded-lg hover:opacity-90 transition">
                  Rent This Car
                </button>
              </div>

              {/* Equipment List */}
              <div>
                <h3 className="text-xl font-semibold mb-2 mt-2 mb-5 text-gray-600">Car Equipment</h3>
                <ul className="list-none grid grid-cols-2 gap-6 text-[#1572D3]">
                  {vehicle.equipment.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#1572D3]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End of Card Container */}
      </div>

      <div className="max-w-screen-4xs">
        <Download />
        <Footer />
      </div>

      {/* Modal Component */}
       <ImageModal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />

    </div>
  );
};

export default VehicleDetailPage;
