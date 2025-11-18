import React, { useState } from 'react';
import './vacancy.css'; // Import CSS file
// import { Link , useNavigate } from 'react-router-dom';


const Vacancy = () => {
  const [position, setPosition] = useState('');
  const [availability, setAvailability] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const status = 1;
    const postData = {
      position,
      availability,
      description,
      duration,
      status,
    };

    const createVacancyUrl = "http://127.0.0.1:4000/vacancy/create";
    try {
      const response = await fetch(createVacancyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        console.log('Vacancy Created Successfully');
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('Error creating vacancy:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="container">
      <h1>Create New Vacancy</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <input
            type="number"
            id="availability"
            name="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button className='btn' type="submit">Create Vacancy</button>
      </form>
    </div>
  );
};

export default Vacancy;