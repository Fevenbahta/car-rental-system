import React from "react";
// Importing the vehicle data
import { vehicles } from './data'; 
import "./MostSearched.css";

const MostSearched = () => {
  if (!vehicles || vehicles.length === 0) {
    return <p>No vehicles found.</p>;
  }

  return (
    <div className="most-searched-container">
       <p
        className="popular p-2 rounded inline-block"
        style={{ backgroundColor: "#E0F7FF", color: "#1572D3" }}
      >
        Popular Rental Deals
      </p>
  <h2>Most Popular Cars</h2>
   
      <div className="vehicles-container">
        {vehicles.map((vehicle, index) => (
  <div key={index} className="vehicle-card">
  <div className="image-container">
    <img src={vehicle.image.src} alt={vehicle.model} className="vehicle-image" />
  </div>
  <div className="description-container">
    <h3>{vehicle.brand}</h3>
    <p className="vehicle-location">
      <i className="fas fa-map-marker-alt icon" /> {vehicle.location}
    </p>
    <p className="vehicle-rating">
      <i className="fas fa-star icon star" /> {vehicle.rating} ({vehicle.reviews})
    </p>
    <hr className="price-separator" />
    <h4>{vehicle.model}</h4>

    <div className="description-row">
      <div className="left-column">
        <p><i className="fas fa-car icon" /> {vehicle.mileage}</p>
        <p><i className="fas fa-cogs icon" /> {vehicle.transmission}</p>
      </div>
      <div className="right-column">
        <p><i className="fas fa-gas-pump icon" /> {vehicle.fuel}</p>
        <p><i className="fas fa-chair icon" /> {vehicle.seats}</p>
      </div>
    </div>


    <p className="price-info">
      <i className="fas fa-dollar-sign icon" />
      <strong>Price</strong>&nbsp;{vehicle.price} ETB/Day
    </p>

    <button className="rent-now-btn">
      Rent Now <i className="fas fa-arrow-right"></i>
    </button>
  </div>
</div>

    
        ))}
      </div>
    </div>
  );
};

export default MostSearched;
