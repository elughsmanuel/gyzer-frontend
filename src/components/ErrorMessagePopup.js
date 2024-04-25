import React from "react";

const ErrorMessagePopup = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup__content">
        <p className="error-popup__message">{message}</p>
        <button className="error-popup__close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorMessagePopup;
