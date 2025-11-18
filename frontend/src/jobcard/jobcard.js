import React from 'react';
import './job.css';
import { Link } from 'react-router-dom';


const JobCard = ({ title, description, location, salary }) => {
  return (
    <div className="vacancy-card">
      <h2 align="center">{title}</h2>
      <p>{description}</p>
      <p>Availability: {location}</p>
      <p>Salary: {salary}</p>

      <Link to="../ApplyNow">
        <button type="button" className='btn'>Apply</button>
      </Link>

    </div>
  );
};

export default JobCard;
