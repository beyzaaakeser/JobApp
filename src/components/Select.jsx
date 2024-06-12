import React from 'react';

const Select = ({ label, options,name,handleChange}) => {
  return (
    <div>
      <label>{label}</label>
      <select defaultValue={""} name={name} onChange={handleChange}>
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
