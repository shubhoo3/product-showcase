import React from 'react';

const SuccessMessage = ({ onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4"
      style={{ zIndex: 1000 }}
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md text-center"
        style={{ position: 'relative', zIndex: 1001 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Enquiry Submitted!
        </h3>

        <p className="text-gray-600 mb-6">
          Thank you for your interest. We'll get back to you soon.
        </p>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
