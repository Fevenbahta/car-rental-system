import React from 'react';
import './HowItWorks.css';  // Importing the CSS file
import frame34 from './Frame34.png'
import frame35 from './Frame35.png'
import frame36 from './Frame36.png'
const HowItWorks = () => {
  return (
    <div className="container">
      {/* Frame 40 */}
      <div className="frame40">
        <div className="frame39">
        <p
        className="popular p-2 rounded inline-block"
        style={{ backgroundColor: "#E0F7FF", color: "#1572D3" }}
      >
    How it Works
      </p>
          <h1 className="header">Rent with following 3 working steps</h1>
         

          <div className="steps">
            {/* Step 1 */}
            <div className="step">
              <div className="iconBox">
              <img src={frame34.src} alt="Car" className="icon" />    </div>
              <div className="stepContent">
                <h2 className="stepTitle">Book your car</h2>
                <p className="stepDesc">Book your car and we will deliver it directly to you</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step">
              <div className="iconBox">
              <img src={frame35.src} alt="Car" className="icon" />
                 </div>
              <div className="stepContent">
                <h2 className="stepTitle">Delivery</h2>
                <p className="stepDesc">We deliver your car at your doorstep</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step">
              <div className="iconBox">
              <img src={frame36.src} alt="Car" className="icon" />  </div>
              <div className="stepContent">
                <h2 className="stepTitle">Return</h2>
                <p className="stepDesc">Return the car after use</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="logos">
        <div className="logoContainer">
          <div className="logo"></div>
        </div>
        <div className="logoContainer">
          <div className="logo"></div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
