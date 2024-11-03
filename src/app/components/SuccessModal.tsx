import React, { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000); 
      return () => clearTimeout(timer); 
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold text-green-600 mb-4">Order Success!</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
