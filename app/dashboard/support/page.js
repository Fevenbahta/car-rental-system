"use client";

import { useState } from "react";
import {
  FaTicketAlt,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "general",
    priority: "medium",
    description: "",
  });

  // Sample support tickets
  const [tickets] = useState([
    {
      id: 1,
      subject: "Payment issue with booking #1234",
      category: "payment",
      priority: "high",
      status: "open",
      date: "2024-03-15",
      lastUpdated: "2 hours ago",
      messages: [
        {
          sender: "user",
          message: "I'm having trouble processing my payment for booking #1234",
          timestamp: "2024-03-15 10:30",
        },
        {
          sender: "support",
          message:
            "We're looking into this issue. Can you provide more details about the error message?",
          timestamp: "2024-03-15 11:15",
        },
      ],
    },
    {
      id: 2,
      subject: "Vehicle maintenance request",
      category: "maintenance",
      priority: "medium",
      status: "in-progress",
      date: "2024-03-14",
      lastUpdated: "1 day ago",
      messages: [
        {
          sender: "user",
          message: "I need to schedule maintenance for my vehicle",
          timestamp: "2024-03-14 09:00",
        },
      ],
    },
  ]);

  // Sample FAQs
  const [faqs] = useState([
    {
      id: 1,
      question: "How do I cancel a booking?",
      answer:
        "You can cancel a booking through your dashboard by selecting the booking and clicking the 'Cancel' button. Please note that cancellation policies may apply.",
      category: "bookings",
    },
    {
      id: 2,
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway.",
      category: "payments",
    },
    {
      id: 3,
      question: "How do I report a maintenance issue?",
      answer:
        "You can report maintenance issues through the maintenance section in your dashboard or by contacting our support team directly.",
      category: "maintenance",
    },
  ]);

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Here you would typically send the ticket to your backend
    console.log("New ticket submitted:", newTicket);
    setNewTicket({
      subject: "",
      category: "general",
      priority: "medium",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-900">Open Tickets</h3>
          <p className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "open").length}
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-yellow-900">In Progress</h3>
          <p className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "in-progress").length}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-900">Resolved</h3>
          <p className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "resolved").length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          className={`pb-2 px-4 ${
            activeTab === "tickets"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          <FaTicketAlt className="inline mr-2" />
          Support Tickets
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === "faq"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("faq")}
        >
          <FaQuestionCircle className="inline mr-2" />
          FAQ
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === "contact"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          <FaPhone className="inline mr-2" />
          Contact Us
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Content based on active tab */}
      {activeTab === "tickets" && (
        <div className="space-y-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setActiveTab("new-ticket")}
          >
            Create New Ticket
          </button>
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500">
                    Category: {ticket.category} | Priority: {ticket.priority}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    ticket.status === "open"
                      ? "bg-red-100 text-red-800"
                      : ticket.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Last updated: {ticket.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "faq" && (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
              <span className="text-sm text-gray-500 mt-2 block">
                Category: {faq.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "contact" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-blue-500 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-2" />
                <span>support@carrent.com</span>
              </div>
              <p className="text-gray-600">
                Our support team is available 24/7 to assist you with any
                questions or concerns.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "new-ticket" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            Create New Support Ticket
          </h3>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, subject: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={newTicket.category}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="general">General</option>
                <option value="payment">Payment</option>
                <option value="booking">Booking</option>
                <option value="maintenance">Maintenance</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={newTicket.priority}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, priority: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newTicket.description}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, description: e.target.value })
                }
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit Ticket
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tickets")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
