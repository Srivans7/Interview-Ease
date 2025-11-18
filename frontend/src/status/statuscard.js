import React from 'react';
import './statuscard.css'; // Add your CSS styles
import ThankYou from '../thankyou/ThankYou';
import { useNavigate } from 'react-router-dom';

const StatusCard = ({ title, status, location, interviewDate,id }) => {
  const navigate = useNavigate();
  const handleSubmit = ()=>{
    navigate("/feedback")
  }
  return (
    <div className="status-card" style={{width:"30vw", marginLeft:"auto", marginRight:"auto"}}>
      <h2>{title}</h2>
      <p>Job ID: {id}</p>
      <p>Status: {status}</p>
      <p>Location: {location}</p>
      <p>Interview Date: {interviewDate}</p>
      <button onClick={handleSubmit} style={{width:"200px"}}>Submit Feedback</button>
    </div>
  );
};

export default StatusCard;
