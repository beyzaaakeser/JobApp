import React from 'react';
import { useSelector } from 'react-redux';

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store);

  // Sadece pozisyon değerlerinden oluşan bir dizi tanımla
  const arr = jobs.map((job) => job[name]);

  // Dizide tekrar eden elemanları kaldırır
  const filteredSet = new Set(arr);

  // Setin dönderdiği nesneyi diziye cevirir.
  const options = Array.from(filteredSet);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={name} required />

      <datalist key={name}>
        {options.map((i,index) => (
          <option key={index} value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
