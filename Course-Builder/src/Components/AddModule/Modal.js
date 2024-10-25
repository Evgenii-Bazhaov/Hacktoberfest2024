import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ onClose, children }) => {
  return (
    <>
      {/* Dark Grey Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-85 z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 relative w-full max-w-md mx-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
