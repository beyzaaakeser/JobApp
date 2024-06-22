import React from 'react';

const NoResult = () => {
  return (
    <div className="result-wrapper">
      <div className="card">
        <div className="head">
          <h2 className="card-title">! No results found !</h2>
        </div>
        <div className="body">
          <p className="card-text">
            Please try different filters or search terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResult;
