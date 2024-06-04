import React from 'react';
import '../styles/components/LoadingSpinner.css';

const LoadingSpinner: React.FC = () => (
  <div className='spinnerContainer'>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
