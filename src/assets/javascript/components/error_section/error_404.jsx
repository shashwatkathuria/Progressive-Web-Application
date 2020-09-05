import React from 'react';

// Displays when /error_404 route is returned by server on 404 NOT FOUND route
const Error404 = (props) => (
  <div className='jumbotron error-section'>
    <h1 className='section-title'>Not Found</h1>
    <p className='lead'>The page you requested for doesn't exist.</p>
  </div>
);

export default Error404;
