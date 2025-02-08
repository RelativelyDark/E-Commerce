import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
  });
  const [updatedData, setUpdatedData] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && token) {
      fetchUserDetails();
    }
  }, [userId, token]);

  const fetchUserDetails = () => {
    axios
      .get(`http://localhost:8080/users/display/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setFormData(response.data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user details!");
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setUpdatedData(formData); // Pre-fill modal with current data
  };

  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validatephone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = () => {
    const { firstName, lastName, city, phone } = updatedData;

    if (
      !firstName.trim() &&
      !lastName.trim() &&
      !city.trim() &&
      !phone.trim()
    ) {
      toast.error("At least one field is required!");
      return;
    }

    if (phone && !validatephone(phone)) {
      toast.error("Invalid phone number! Must be 10 digits.");
      return;
    }

    axios
      .put(`http://localhost:8080/users/edit/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchUserDetails(); // Fetch updated data from the database
        toast.success("Details updated successfully!");
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        toast.error("Failed to update user details!");
      });
  };

  const handleDeleteAccount = () => {
    axios
      .delete(`http://localhost:8080/users/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Account deleted successfully!");
        closeDeleteModal();

        // Clear user-related data from localStorage
        localStorage.removeItem("userId");
        localStorage.removeItem("Authorization");

        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete the account!");
      });
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${
          isModalOpen || isDeleteModalOpen ? "blur-md" : ""
        } bg-gray-100`}
      >
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
            User Profile
          </h2>
          <p className="mb-2 text-blue-800">
            <strong>First Name:</strong> {formData.firstName}
          </p>
          <p className="mb-2 text-blue-800">
            <strong>Last Name:</strong> {formData.lastName}
          </p>
          <p className="mb-2 text-blue-800">
            <strong>City:</strong> {formData.city}
          </p>
          <p className="mb-4 text-blue-800">
            <strong>Phone Number:</strong> {formData.phone}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={openModal}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition"
              aria-label="Update Details"
            >
              Update Details
            </button>
            <button
              onClick={openDeleteModal}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition"
              aria-label="Delete Account"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-xl font-bold mb-4 text-blue-800">
              Update User Details
            </h3>
            {["firstName", "lastName", "city", "phone"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block mb-2 font-medium text-blue-800">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={updatedData[field] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter new ${field}`}
                  className="w-full px-3 py-2 border-2 border-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    color: updatedData[field]?.trim() ? "black" : "black", // Gold if not empty, otherwise black
                  }}
                />
              </div>
            ))}
            <div className="flex gap-4 justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                aria-label="Save"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-xl font-bold mb-4 text-blue-800">
              Are you sure?
            </h3>
            <p className="mb-4 text-blue-800">
              Do you really want to delete your account?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                aria-label="No"
              >
                No
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                aria-label="Yes"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}
