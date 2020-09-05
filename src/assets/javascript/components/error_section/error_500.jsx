import React from 'react';

// Displays when /error_500 route is returned by server on 500 Internal Server Error route
const Error500 = (props) => (
  <div className='jumbotron error-section'>
    <h1 className='section-title'>Internal Server Error</h1>
    <p className='lead'>We encountered an error while processing your request.</p>
  </div>
);

export default Error500;
