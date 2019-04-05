import './pageNotFound.css';

import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <Link to="/">Return to Home Page</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
