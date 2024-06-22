// JobList.jsx

import React from 'react';
import Filter from '../components/Filter';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Card from '../components/Card';
import NoResult from '../components/NoResult';

const JobList = ({ retry }) => {
  const { jobs, error, isLoading } = useSelector((store) => store);

  return (
    <div className="list-page">
      <Filter />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} retry={retry} />
      ) : jobs.length === 0 ? (
        <NoResult/>
      ) : (
        <div className="cards-wrapper">
          {jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
