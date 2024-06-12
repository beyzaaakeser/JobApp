import React from 'react';
import AutoInput from '../components/AutoInput';
import Select from '../components/Select';
import { statusOpt, typeOpt } from '../constants';
import SubmitButton from '../components/SubmitButton';
import { v4 } from 'uuid';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createJob } from '../app/slices/jobSlice';
import { useNavigate } from 'react-router-dom';
const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form Data Olustur
    const formData = new FormData(e.target);

    const newJobData = Object.fromEntries(formData.entries());
    newJobData.id = v4();
    newJobData.date = Date.now();

    api
      .post('/jobs', newJobData)
      .then(() => {
        toast.success('Job successfully Added!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // stora yeni veri kaydet
        dispatch(createJob(newJobData));
        // işlem başarılı olursa anasayfaya yönlendir
        navigate("/")
      })
      .catch(() => toast.error('Hata Oluştu'));
  };
  return (
    <div className="add-page">
      <section className="container">
        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>
          <AutoInput label={'Position'} name={'position'} />
          <AutoInput label={'Company'} name={'company'} />
          <AutoInput label={'Location'} name={'location'} />
          <Select label={'Status'} options={statusOpt} name={"status"} />
          <Select label={'Types'} options={typeOpt} name={"type"} />
          <div className="btn-container">
            <SubmitButton text={'Save'} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
