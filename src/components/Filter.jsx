// Filter.jsx

import React, { useEffect, useState } from 'react';
import Select from './Select';
import { statusOpt, typeOpt, sortOpt } from '../constants';
import SubmitButton from './SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setJobs, setLoading } from '../app/slices/jobSlice';
import api from '../utils/api';
import NoResult from './NoResult'; // NoResult componentini import ettik

const Filter = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [noResults, setNoResults] = useState(false);

  // DEBOUNCE: kötü cihazlarda kasma yapmaması ve API'de trafik oluşturmaması için geciktirme
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedText(text), 600);
    return () => clearTimeout(timer);
  }, [text]);

  const fetchJobs = (params) => {
    dispatch(setLoading());
    api
      .get('/jobs', { params })
      .then((res) => {
        let jobs = res.data;
        if (params.q) {
          jobs = jobs.filter((job) =>
            job.position.toLowerCase().includes(params.q)
          );
        }
        jobs = sortJobs(jobs, params._sort, params._order);
        dispatch(setJobs(jobs));
        setNoResults(jobs.length === 0);
      })
      .catch((err) => {
        dispatch(setError(err.message));
        setNoResults(true);
      });
  };

  const sortJobs = (jobs, sortParam, orderParam) => {
    if (sortParam === 'company') {
      return jobs.sort((a, b) => {
        return orderParam === 'asc'
          ? a.company.localeCompare(b.company)
          : b.company.localeCompare(a.company);
      });
    } else if (sortParam === 'date') {
      return jobs.sort((a, b) => {
        return orderParam === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      });
    }
    return jobs;
  };

  useEffect(() => {
    const sortParam =
      sort === 'a-z' || sort === 'z-a' ? 'company' : 'date';
    const orderParam =
      sort === 'a-z' || sort === 'earliest' ? 'asc' : 'desc';

    const params = {
      q: debouncedText ? debouncedText.toLowerCase() : undefined,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };

    fetchJobs(params);
  }, [debouncedText, sort, type, status, dispatch]);

  const handleReset = (e) => {
    e.preventDefault();
    // Stateleri sıfırla
    setText('');
    setStatus('');
    setType('');
    setSort('');
    setDebouncedText('');
    setNoResults(false);
    e.target.reset();
    fetchJobs({});
  };

  return (
    <div className="filter-sec">
      <section className="container">
        <h2>Search Form</h2>

        <form onSubmit={handleReset}>
          <div>
            <label>Search</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <Select
            label={'Status'}
            options={statusOpt}
            handleChange={(e) => setStatus(e.target.value)}
            value={status}
          />
          <Select
            label={'Types'}
            options={typeOpt}
            handleChange={(e) => setType(e.target.value)}
            value={type}
          />
          <Select
            label={'Sort'}
            options={sortOpt}
            handleChange={(e) => setSort(e.target.value)}
            value={sort}
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
