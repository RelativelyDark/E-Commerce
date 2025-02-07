import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
  });
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUpdatedData({ firstName: "", lastName: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
    toast.success("Details updated successfully!");
    closeModal();
  };

  return (
    <div className="relative">
      {/* Background content */}
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${
          isModalOpen ? "blur-md" : ""
        } bg-gray-100`}
      >
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
          <p className="mb-2">
            <strong>First Name:</strong> {formData.firstName}
          </p>
          <p className="mb-4">
            <strong>Last Name:</strong> {formData.lastName}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Update Details
            </button>
            <button
              onClick={() => toast.info("Account deleted!")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-10"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white
            }}
          ></div>
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h3 className="text-xl font-bold mb-4">Update User Details</h3>
              <div className="mb-4">
                <label className="block mb-2 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter new first name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={updatedData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter new last name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Container */}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
