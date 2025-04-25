"use client";

import { useEffect, useState, memo } from "react";
import { IconCar, IconInfoCircleFilled, IconX } from "@tabler/icons-react";
import { IconMapPinFilled } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";


// Define car data as JSON
const carData = [
  { name: "Audi A1 S-Line", image: "/audia1.jpg" },
  { name: "VW Golf 6", image: "/golf6.jpg" },
  { name: "Toyota Camry", image: "/toyotacamry.jpg" },
  { name: "BMW 320 ModernLine", image: "/bmw320.jpg" },
  { name: "Mercedes-Benz GLK", image: "/benz.jpg" },
  { name: "VW Passat CC", image: "/passatcc.jpg" }
];

function BookCar() {
  const [modal, setModal] = useState(false); // class - active-modal

  // booking car
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  // modal infos
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

  const [ageError, setAgeError] = useState("");
  const handleAge = (e) => {
    const newAge = e.target.value;
    setAge(newAge);

    if (newAge && newAge < 18) {
      setAgeError("The age is too low");
    } else {
      setAgeError("");
    }
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    if (ageError) {
      alert("Please correct the errors before confirming your booking.");
      return;
    }

    setModal(!modal);
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";
  };

  // taking value of modal inputs
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal); // This toggles the modal state
      const modalDiv = document.querySelector(".booking-modal");

      // Only scroll if modalDiv exists
      if (modalDiv) {
        modalDiv.scroll(0, 0);
      }

      errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // taking value of booking inputs
  const handleCar = (e) => {
    const selectedName = e.target.value;
    setCarType(selectedName);

    const foundCar = carData.find((car) => car.name === selectedName);
    if (foundCar) {
      setCarImg(foundCar.image);
    } else {
      setCarImg("");
    }
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="flex justify-center items-center bg-gradient-to-b from-gray-100 to-white font-poppins relative">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`fixed inset-0 bg-black bg-opacity-30 z-[999999999] ${modal ? "flex" : "hidden"}`}
        ></div>

        <div className="container mx-auto mb-40 px-6">
          <div className="bg-white w-full max-w-6xl p-16 shadow-lg rounded-md text-[#010103] z-10 relative flex flex-col">
            <h2 className="text-4xl font-bold mb-12">Book a car</h2>

            <p className="error-message hidden text-red-800 bg-red-200 border border-red-300 p-6 rounded-md mb-8 text-xl font-medium flex justify-between items-center">
              All fields required! <IconX width={24} height={24} />
            </p>

            <p className="booking-done hidden text-green-900 bg-green-100 border border-green-300 p-6 rounded-md mb-8 text-xl font-medium flex justify-between items-center">
              Check your email to confirm an order.{" "}
              <IconX width={24} height={24} onClick={hideMessage} />
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Car Type */}
              <div className="flex flex-col">
                <label className="text-xl font-semibold mb-4 flex items-center">
                  <IconCar className="text-blue-600 mr-3" /> Select Your Car Type <b className="text-blue-600 ml-2">*</b>
                </label>
                <select value={carType} onChange={handleCar} className="text-gray-500 border border-gray-300 rounded px-6 py-4 text-xl">
                  <option>Select your car type</option>
                  {carData.map((car) => (
                    <option key={car.name} value={car.name}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Location */}
              <div className="flex flex-col">
                <label className="text-xl font-semibold mb-4 flex items-center">
                  <IconMapPinFilled className="text-blue-600 mr-3" /> Pick-up <b className="text-blue-600 ml-2">*</b>
                </label>
                <select value={pickUp} onChange={handlePick} className="text-gray-500 border border-gray-300 rounded px-6 py-4 text-xl">
                  <option>Select pick up location</option>
                  <option>Addis Ababa</option>
                  <option>Rome</option>
                  <option>Los Angeles</option>
                  <option>Las Vegas</option>
                  <option>Barcellona</option>
                </select>
              </div>

              {/* Drop-off Location */}
              <div className="flex flex-col">
                <label className="text-xl font-semibold mb-4 flex items-center">
                  <IconMapPinFilled className="text-blue-600 mr-3" /> Drop-off <b className="text-blue-600 ml-2">*</b>
                </label>
                <select value={dropOff} onChange={handleDrop} className="text-gray-500 border border-gray-300 rounded px-6 py-4 text-xl">
                  <option>Select drop off location</option>
                  <option>New York</option>
                  <option>Rome</option>
                  <option>Los Angeles</option>
                  <option>Las Vegas</option>
                  <option>Barcellona</option>
                </select>
              </div>

              {/* Pickup Date */}
              <div className="flex flex-col">
                <label htmlFor="picktime" className="text-xl font-semibold mb-4 flex items-center">
                  <IconCalendarEvent className="text-blue-600 mr-3" /> Pick-up <b className="text-blue-600 ml-2">*</b>
                </label>
                <input
                  id="picktime"
                  value={pickTime}
                  onChange={handlePickTime}
                  type="date"
                  className="text-gray-500 border border-gray-300 rounded px-6 py-4 text-xl"
                />
              </div>

              {/* Drop-off Date */}
              <div className="flex flex-col">
                <label htmlFor="droptime" className="text-xl font-semibold mb-4 flex items-center">
                  <IconCalendarEvent className="text-blue-600 mr-3" /> Drop-off <b className="text-blue-600 ml-2">*</b>
                </label>
                <input
                  id="droptime"
                  value={dropTime}
                  onChange={handleDropTime}
                  type="date"
                  className="text-gray-500 border border-gray-300 rounded px-6 py-4 text-xl"
                />
              </div>

              <div className="self-end">
                <Link
                  href={{
                    pathname: '/Pages/vehicle-group',
                    query: {
                      carType,
                      pickUp,
                      dropOff,
                      pickTime,
                      dropTime
                    }
                  }}
                >
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-4 rounded shadow-lg text-xl font-medium hover:shadow-xl transition-all"
                  >
                    Search
                  </button>
                </Link>
              </div>
            </form>

            {/* Show selected car image */}
            {carImg && (
              <Image src={carImg} alt={carType} width={400} height={300} className="rounded-lg mt-4" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(BookCar);
