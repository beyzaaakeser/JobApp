import React from 'react';
import { FallingLines } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner">
        <FallingLines
          visible={true}
          height="150"
          width="150"
          color="#007bff"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Loader;
