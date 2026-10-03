import React from 'react';
import "../../../style/Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div 
        className="loading-spinner" 
        role="status" 
        aria-live="polite"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
