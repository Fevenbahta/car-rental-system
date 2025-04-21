"use client";

import { useState, useEffect } from "react";
import { FaStar, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editForm, setEditForm] = useState({
    rating: 0,
    review_text: "",
  });
  const [createForm, setCreateForm] = useState({
    rating: 0,
    review_text: "",
    car_id: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Sample cars for review creation
  const sampleCars = [
    { id: 1, model: "Toyota Camry 2023" },
    { id: 2, model: "Honda Civic 2023" },
    { id: 3, model: "Tesla Model 3" },
    { id: 4, model: "BMW X5" },
  ];

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
        "https://www.carrentalbackend.emareicthub.com/api/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setError(error.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!createForm.car_id) {
      errors.car_id = "Please select a car";
    }
    if (!createForm.review_text.trim()) {
      errors.review_text = "Review text is required";
    }
    if (createForm.rating === 0) {
      errors.rating = "Please select a rating";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateReview = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "https://www.carrentalbackend.emareicthub.com/api/reviews",
        {
          car_id: parseInt(createForm.car_id),
          rating: createForm.rating,
          review_text: createForm.review_text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Review created successfully");
      setTimeout(() => setMessage(null), 3000);
      setShowCreateForm(false);
      setCreateForm({ rating: 0, review_text: "", car_id: "" });
      setFormErrors({});
      fetchReviews();
    } catch (error) {
      console.error("Failed to create review:", error);
      setError(error.response?.data?.message || "Failed to create review");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.delete(
        `https://www.carrentalbackend.emareicthub.com/api/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Review deleted successfully");
      setTimeout(() => setMessage(null), 3000);
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error("Failed to delete review:", error);
      setError(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review.id);
    setEditForm({
      rating: review.rating,
      review_text: review.review_text,
    });
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.put(
        `https://www.carrentalbackend.emareicthub.com/api/reviews/${reviewId}`,
        {
          rating: editForm.rating,
          review_text: editForm.review_text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Review updated successfully");
      setTimeout(() => setMessage(null), 3000);
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      console.error("Failed to update review:", error);
      setError(error.response?.data?.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, isEditable = false, onChange = null) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        onClick={() => isEditable && onChange && onChange(index + 1)}
        className={isEditable ? "cursor-pointer" : "cursor-default"}
      >
        <FaStar
          className={`${
            index < rating ? "text-yellow-400" : "text-gray-300"
          } text-lg`}
        />
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button
          onClick={fetchReviews}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Reviews</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <FaPlus />
          <span>Add Review</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-xl font-semibold">Create New Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Car
              </label>
              <select
                value={createForm.car_id}
                onChange={(e) =>
                  setCreateForm({ ...createForm, car_id: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.car_id ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a car</option>
                {sampleCars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.model}
                  </option>
                ))}
              </select>
              {formErrors.car_id && (
                <p className="text-red-500 text-sm mt-1">{formErrors.car_id}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Rating:</span>
              <div className="flex space-x-1">
                {renderStars(createForm.rating, true, (rating) =>
                  setCreateForm({ ...createForm, rating })
                )}
              </div>
              {formErrors.rating && (
                <p className="text-red-500 text-sm">{formErrors.rating}</p>
              )}
            </div>

            <div>
              <textarea
                value={createForm.review_text}
                onChange={(e) =>
                  setCreateForm({ ...createForm, review_text: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.review_text ? "border-red-500" : ""
                }`}
                rows="3"
                placeholder="Write your review..."
              />
              {formErrors.review_text && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.review_text}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setFormErrors({});
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReview}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {review.car?.make} {review.car?.model}
                </h3>
                <div className="flex items-center space-x-1 mt-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Reviewed by {review.user?.first_name} {review.user?.last_name}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditReview(review)}
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
              </div>
            </div>

            {editingReview === review.id ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex space-x-1">
                    {renderStars(editForm.rating, true, (rating) =>
                      setEditForm({ ...editForm, rating })
                    )}
                  </div>
                </div>
                <textarea
                  value={editForm.review_text}
                  onChange={(e) =>
                    setEditForm({ ...editForm, review_text: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Update your review..."
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingReview(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateReview(review.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">{review.review_text}</p>
            )}

            <div className="text-sm text-gray-500">
              Posted on {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              You haven&apos;t written any reviews yet.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 text-blue-500 hover:text-blue-600"
            >
              Write your first review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
