import React, { useState } from 'react';
import Select from './Select';
import { statusOpt, typeOpt, sortOpt } from '../constants';
import SubmitButton from './SubmitButton';

const Filter = () => {
  const [text, setText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();

  const handleReset = (e) => {
    e.preventDefault();
    // stateleri sıfırla
    setText();
    setSort();
    setStatus();
    setType();
    
    // inputları sıfırla
    e.target.reset();
  };
  return (
    <div className="filter-sec">
      <section className="container">
        <h2>Search Form</h2>

        <form onSubmit={handleReset}>
          <div>
            <label htmlFor="">Search</label>
            <input type="text" onChange={(e) => setText(e.target.value)} />
          </div>
          <Select
            label={'Status'}
            options={statusOpt}
            handleChange={(e) => setStatus(e.target.value)}
          />
          <Select
            label={'Types'}
            options={typeOpt}
            handleChange={(e) => setType(e.target.value)}
          />
          <Select
            label={'Sort'}
            options={sortOpt}
            handleChange={(e) => setSort(e.target.value)}
          />

          <div className="btn-container btn-fil">
            <SubmitButton text={'Reset Filters'} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Filter;
