import React from "react";
import dynamic from 'next/dynamic';
import 'font-awesome/css/font-awesome.min.css';


const Navbar = dynamic(()=>import('./Components/Navbar/Navbar.jsx'))
const Hero = dynamic(()=>import('./Components/Hero/Hero.jsx'))
const BookCar = dynamic(()=>import('./Components/BookCar/BookCar.jsx'))
const HowItWorks = dynamic(()=>import('./Components/HowItWorks/HowItWorks.jsx'))
const MostSearched = dynamic(()=>import('./Components/MostSearched/MostSearched.jsx'))
const PlanTrip = dynamic(()=>import('./Components/PlanTrip/PlanTrip.jsx'))
const ChooseUs = dynamic(()=>import('./Components/ChooseUs/ChooseUs.jsx'))
const Testimonials = dynamic(()=>import('./Components/Testimonials/Testimonials.jsx'))
const Faq = dynamic(()=>import('./Components/faq/Faq.jsx'))
const Download = dynamic(()=>import('./Components/Download/Download.jsx'))


const Footer = dynamic(()=>import('./Components/Footer/Footer.jsx'))

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BookCar />
      <PlanTrip /> 
      <MostSearched />
      <ChooseUs />
      <Testimonials />
      <Faq />
      <Download />
      <Footer />

    </div>
  );
}

