"use client";

import { useState } from "react";
import { FaStar, FaEdit, FaTrash, FaFlag, FaUser, FaCar } from "react-icons/fa";

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("given");
  const [editingReview, setEditingReview] = useState(null);

  const reviews = [
    {
      id: 1,
      type: "given",
      title: "Great experience with the Toyota Camry",
      rating: 4.5,
      comment:
        "The car was in excellent condition and the owner was very responsive.",
      date: "2024-03-15",
      status: "published",
      car: {
        make: "Toyota",
        model: "Camry",
        year: 2022,
        image: "/images/cars/toyota-camry.jpg",
      },
    },
    {
      id: 2,
      type: "received",
      title: "Perfect rental experience",
      rating: 5,
      comment: "The renter took great care of my car and returned it on time.",
      date: "2024-03-10",
      status: "published",
      reviewer: {
        name: "John Doe",
        avatar: "/images/avatars/john-doe.jpg",
      },
    },
  ];

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleDelete = (id) => {
    // Delete review logic here
    console.log("Deleting review:", id);
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
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStar
          key="half-star"
          className="text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const filteredReviews = reviews.filter((review) => review.type === activeTab);

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
                      onClick={() => handleDelete(review.id)}
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
