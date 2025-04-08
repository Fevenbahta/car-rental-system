'use client'

import SelectCar from "./caricon3.jpg";
import Contact from "./caricon3.jpg";
import Drive from "./caricon.jpg";
import Image from "next/image";
import "./PlanTrip.css";
import { ScrollReveal } from "reveal-on-scroll-react"


function PlanTrip() {
  return (
    <>
      <section className="plan-section" id="about">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <ScrollReveal.h3>How It Works</ScrollReveal.h3>
              <ScrollReveal.h2>Quick &amp; easy car rental</ScrollReveal.h2>
            </div>

            <div className="plan-container__boxes">
              <div className="plan-container__boxes__box">
                <Image src={SelectCar} alt="icon_img" loading="lazy" />
                <ScrollReveal.h3>Select Car</ScrollReveal.h3>
                <ScrollReveal.p>
                  We offer a big range of vehicles for all your driving needs.
                  We have the perfect car to meet your needs
                </ScrollReveal.p>
              </div>

              <div className="plan-container__boxes__box">
                <Image src={Contact} alt="icon_img" loading="lazy" />
                <ScrollReveal.h3>Pick a Date </ScrollReveal.h3>
                <ScrollReveal.p>
                  Pick a Date when you want to rent and enjoy the ride.
                </ScrollReveal.p>
              </div>

              <div className="plan-container__boxes__box smaller">
                <Image src={Drive} alt="icon_img" loading="lazy" />
                <ScrollReveal.h3>{`Let's Drive`}</ScrollReveal.h3>
                <ScrollReveal.p>
                  {`
                  Whether you're hitting the open road, we've got you covered
                  with our wide range of cars
                `}
                </ScrollReveal.p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
