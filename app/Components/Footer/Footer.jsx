import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ul className="space-y-4">
            <li className="text-3xl font-semibold">
              <span>CAR</span> Rental
            </li>
            <li>
              We offer a big range of vehicles for all your driving needs. We
              have the perfect car to meet your needs.
            </li>
            <li>
              <a href="tel:123456789" className="text-blue-400 hover:underline">
                &nbsp; (123) - 456-789
              </a>
            </li>
            <li>
              <a
                href="mailto:carrental@gmail.com"
                className="text-blue-400 hover:underline"
              >
                &nbsp; carrental@gmail.com
              </a>
            </li>
          </ul>

          <ul className="space-y-4">
            <li className="text-3xl font-semibold">Company</li>
            <li>
              <a href="#home" className="text-blue-400 hover:underline">
                New York
              </a>
            </li>
            <li>
              <a href="#home" className="text-blue-400 hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#home" className="text-blue-400 hover:underline">
                Mobile
              </a>
            </li>
            <li>
              <a href="#home" className="text-blue-400 hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#home" className="text-blue-400 hover:underline">
                How we work
              </a>
            </li>
          </ul>

          <ul className="space-y-4">
            <li className="text-3xl font-semibold">Working Hours</li>
            <li>Mon - Fri: 9:00AM - 9:00PM</li>
            <li>Sat: 9:00AM - 7:00PM</li>
            <li>Sun: Closed</li>
          </ul>

          <ul className="space-y-4">
            <li className="text-3xl font-semibold">Subscription</li>
            <li>
              Subscribe your Email address for latest news & updates.
            </li>
            <li>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </li>
            <li>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Submit
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
