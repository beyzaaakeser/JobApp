import React from 'react';
import AutoInput from '../components/AutoInput';
import Select from '../components/Select';
import { statusOpt, typeOpt } from '../constants';
import SubmitButton from '../components/SubmitButton';
import { v4 } from 'uuid';

const AddJob = () => {
  const handleSubmit = (e) =>{
    e.preventDefaul();
    // Form Data Olustur
    const formData = new FormData(e.target)
    
    const newJobData = Object.fromEntries(formData.entries())
    newJobData.id = v4();
    newJobData.date = Date.now();
    console.log(newJobData)
  }
  return (
    <div className="add-page">
      <section className="container">
        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>
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
