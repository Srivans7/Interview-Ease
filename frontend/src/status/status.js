import {jwtDecode} from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusCard from './statuscard'; // Update import to correct path

import './status.css';

const Status = () => {
  
  const navigate = useNavigate();
  const [statusCards, setStatusCards] = useState([]);
  const [candidateId, setCandidateId] = useState(''); // Add state for candidate ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      setCandidateId(decodedToken.payload.candidate_id);
    }
  }, []);

  useEffect(() => {
    // Fetch status cards when the component mounts or candidateId changes
    if (candidateId) {
      fetch('http://127.0.0.1:4000/application/getStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidate_id: candidateId }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch status cards');
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setStatusCards(data); // Update status cards state with fetched data
        })
        .catch(error => {
          console.error('Error fetching status cards:', error);
        });
    }
  }, [candidateId]); // Effect runs when candidateId changes

const handleHome=()=>{
  navigate("/landing");
}
  return (
    <div>
      <div className="status-container">
      <button onClick={handleHome} style={{width:"100px", float:"left"}}>Home</button>
        <h1>Job Application Status</h1>
        
      </div>
      <div className='status-container'>
        {/* Render all status cards */}
        {statusCards.map(job => (
          <StatusCard
            key={job.id} // Assuming each job card has a unique ID
            id={job.id}
            title={job.position}
            status={job.status_name}
            location={job.location}
            interviewDate={job.interview_date}
          />
        ))}
      </div>
    </div>
  );
};

export default Status;
