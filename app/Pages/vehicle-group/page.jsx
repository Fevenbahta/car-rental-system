// Inside your page or component where the Navbar is used
import React from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../Components/Navbar/Navbar.jsx"));
const VehicleGroup = dynamic(() => import("../../Components/VehicleGroup/VehicleGroup.jsx"));
const Footer = dynamic(()=>import('../../Components/Footer/Footer.jsx'))
const Download = dynamic(()=>import('../../Components/Download/Download.jsx'))

export default function VehicleGroupPage() {
  return (
    <div>
      {/* Add transparent black background using Tailwind classes */}
      <Navbar className="bg-black bg-opacity-80" /> 
      <VehicleGroup />
      <div className="max-w-screen-4xs"><Download/><Footer/> </div>
    </div>
  );
}
