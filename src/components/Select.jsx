import React from 'react';

const Select = ({ label, options }) => {
  return (
    <div>
      <label>{label}</label>
      <select name="" id="">
        <option value="">Please Select</option>
        {options.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
