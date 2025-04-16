"use client";

import { useState, useEffect } from "react";
import { FaStar, FaEdit, FaTrash, FaFlag, FaUser, FaCar } from "react-icons/fa";
import axios from "axios";

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("given");
  const [editingReview, setEditingReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "https://www.carrentalbackend.emareicthub.com/api/reviews/my-reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setError(error.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleDeleteReview = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://www.carrentalbackend.emareicthub.com/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({
        type: "success",
        text: "Review deleted successfully",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
      setError(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  const handleReport = (id) => {
    // Report review logic here
    console.log("Reporting review:", id);
  };

  const handleSaveEdit = () => {
    // Save edited review logic here
    console.log("Saving edited review:", editingReview);
    setEditingReview(null);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <FaStar
          key={index}
          className={`${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const filteredReviews = reviews.filter((review) => review.type === activeTab);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center p-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchReviews}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("given")}
          className={`px-4 py-2 font-medium ${
            activeTab === "given"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews Given
        </button>
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2 font-medium ${
            activeTab === "received"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews Received
        </button>
      </div>

      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow p-6">
            {editingReview?.id === review.id ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {renderStars(editingReview.rating)}
                </div>
                <input
                  type="text"
                  value={editingReview.title}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Review title"
                />
                <textarea
                  value={editingReview.comment}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      comment: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Your review"
                  rows={4}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingReview(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                </div>
                <h3 className="text-xl font-semibold mt-2">{review.title}</h3>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {review.type === "given" ? (
                      <div className="flex items-center space-x-2">
                        <FaCar className="text-gray-500" />
                        <span>
                          {review.car.make} {review.car.model} (
                          {review.car.year})
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-gray-500" />
                        <span>{review.reviewer.name}</span>
                      </div>
                    )}
                    <span className="text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => handleReport(review.id)}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <FaFlag />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
