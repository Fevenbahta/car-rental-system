import React from "react";
import dynamic from 'next/dynamic';
// src/index.js or src/index.tsx
import 'font-awesome/css/font-awesome.min.css';


// const login = dynamic(()=>import('./Components/login/login'))
// const register = dynamic(()=>import('./Components/register/register'))
// const OTP = dynamic(()=>import('./Components/otpverification/otpverification'))
// const forgetpassword = dynamic(()=>import('./Components/forgotpassword/forgotpassword'))
const Navbar = dynamic(()=>import('./Components/Navbar/Navbar'))
const Hero = dynamic(()=>import('./Components/Hero/Hero'))
const BookCar = dynamic(()=>import('./Components/BookCar/BookCar'))
const HowItWorks = dynamic(()=>import('./Components/HowItWorks/HowItWorks'))
const MostSearched = dynamic(()=>import('./Components/MostSearched/MostSearched'))
const PlanTrip = dynamic(()=>import('./Components/PlanTrip/PlanTrip'))
const PickCar = dynamic(()=>import('./Components/PickCar/PickCar'))
const ChooseUs = dynamic(()=>import('./Components/ChooseUs/ChooseUs'))
const Testimonials = dynamic(()=>import('./Components/Testimonials/Testimonials'))
const Faq = dynamic(()=>import('./Components/faq/Faq'))
const Download = dynamic(()=>import('./Components/Download/Download'))
const About =  dynamic(() => import("./Components/about/AboutUs"))
const VehicleGroup = dynamic(() => import("./Components/VehicleGroup/VehicleGroup"))
const Brand = dynamic(() =>import("./Components/Brand/Brand"))
const Footer = dynamic(()=>import('./Components/Footer/Footer'))

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
   
      <BookCar /> 
      <About />
      <PlanTrip />  {/* <HowItWorks /> */}
      <MostSearched />
      <Brand />
      <VehicleGroup />
       
      {/* <PickCar /> */}
      <ChooseUs />
      <Testimonials />
      <Faq />
      <Download />
      <Footer />
    </div>
  );
}

