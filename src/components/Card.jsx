import React from 'react';
import DelButton from './DelButton';
import { MdLocationPin } from 'react-icons/md';
import { FaSuitcase } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
const Card = ({ job }) => {
  const colors = {
    Interview: '#7ABA78',
    Rejected: '#EE4E4E',
    Continues: '#FFA559',
  };
  return (
    <div className="card">
      <div className="head">
        <section>
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>
          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </section>
        <section>
          <DelButton />
        </section>
      </div>

      <div className="body">
        <div className="field">
          <MdLocationPin />
          <p>{job.location}</p>
        </div>

        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>

        <div className="field">
          <FaCalendarAlt />
          <p>{new Date(job.date).toLocaleDateString()}</p>
        </div>

        <div className="status">
          <p
            style={{
              border: `1px solid ${colors[job.status]}`,
              color: colors[job.status],
              fontWeight: '500',
            }}
          >
            {job.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
