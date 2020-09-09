import React from 'react';

const LoadingSpinner = (props) => (
  <div className='loading-spinner-container'>
    <div className="spinner-border loading-spinner" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <h1 className='lead'>Loading</h1>
  </div>
);

export default LoadingSpinner;
