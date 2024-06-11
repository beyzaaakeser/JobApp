import React from 'react';
import DelButton from './DelButton';

const Card = ({ job }) => {
  return (
    <div className="card">
      <div className="head">
        <section>
          <div className='letter'>
            <span>{job.company[0]}</span>
          </div>
          <div className="ingo">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </section>
        <section>
            <DelButton/>
        </section>
      </div>
    </div>
  );
};

export default Card;
