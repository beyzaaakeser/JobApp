import React from 'react';
import AutoInput from '../components/AutoInput';
import Select from '../components/Select';
import { statusOpt, typeOpt } from '../constants';
import SubmitButton from '../components/SubmitButton';

const AddJob = () => {
  return (
    <div className="add-page">
      <section className="container">
        <h2>Add New Job</h2>

        <form>
          <AutoInput label={'Position'} name={'position'} />
          <AutoInput label={'Company'} name={'company'} />
          <AutoInput label={'Location'} name={'location'} />
          <Select label="Status" options={statusOpt} />
          <Select label="Types" options={typeOpt} />
          <div className='btn-container'>
            <SubmitButton text={"Save"}/>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
