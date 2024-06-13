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
  const [debouncedText, setDebouncedText] = useState();

  // DEBOUNCE : kötü cihazlarda kasma yapmaması ve apide trafik oluşturmaması için geciktirme
  useEffect(() => {
    if (text === undefined) return;
    const timer = setTimeout(() => setDebouncedText(text), 600);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  // Filtreleme veya sıralama ile ilgili bir state değiştiğinde apiden güncel verileri alma
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
      .get('/jobs', { params: { q: 'text' } })
      .then((res) => {
        const filteredJobs = res.data.filter((job) =>
          job.position.includes(params.q)
        );
        dispatch(setJobs(filteredJobs));
      })
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, sort, type, status]);

  const handleReset = (e) => {
    e.preventDefault();
    // stateleri sıfırla
    setText();
    setStatus();
    setType();
    setSort();
    setDebouncedText();

    // inputları sıfırla
    e.target.reset();
  };
  return (
    <div className="filter-sec">
      <section className="container">
        <h2>Search Form</h2>

        <form onSubmit={handleReset}>
          <div>
            <label>Search</label>
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
