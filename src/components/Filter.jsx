import React from 'react';
import Select from './Select';
import { statusOpt, typeOpt, sortOpt } from '../constants';
import SubmitButton from './SubmitButton';

const Filter = () => {
  return (
    <div className="filter-sec">
      <section className="container">
        <h2>Search Form</h2>

        <form>
          <div>
            <label htmlFor="">Search</label>
            <input type="text" />
          </div>
          <Select label="Status" options={statusOpt} />
          <Select label="Types" options={typeOpt} />
          <Select label="Sort" options={sortOpt} />

          <div className='btn-container btn-fil'>
            <SubmitButton text={'Reset Filters'} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Filter;
