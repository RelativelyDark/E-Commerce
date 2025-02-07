// src/components/ui/Modal.jsx
import React from "react";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children }) {
  return <h2 className="text-xl font-bold mb-4">{children}</h2>;
}

export function ModalBody({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function ModalFooter({ children }) {
  return <div className="flex justify-end space-x-2">{children}</div>;
}
