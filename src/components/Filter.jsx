import React, { useEffect, useState } from 'react';
import Select from './Select';
import { statusOpt, typeOpt, sortOpt } from '../constants';
import SubmitButton from './SubmitButton';
import { useDispatch } from 'react-redux';
import { setError, setJobs, setLoading } from '../app/slices/jobSlice';
import api from '../utils/api';
const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();

  useEffect(() => {
    const sortParam =
      sort === 'a-z' || sort === 'z-a'
        ? 'company'
        : sort === 'latest' || sort === 'earliest'
        ? 'date'
        : undefined;

    const orderParam =
      sort === 'a-z'
        ? 'asc'
        : sort === 'z-a'
        ? 'desc'
        : sort === 'latest'
        ? 'desc'
        : sort === 'earliest'
        ? 'asc'
        : undefined;

    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };
    dispatch(setLoading());

    api
      .get('/jobs', { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [text,sort,type,status]);

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
