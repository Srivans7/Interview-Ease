import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './feedback.css'; // Import CSS file

const Feedback = () => {
  const [interview_id, setInterviewId] = useState('');
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      interview_id,
      feedback,
    };

    const feedbackUrl = "http://127.0.0.1:4000/application/feedback";
    try {
      const response = await fetch(feedbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        console.log('Feedback Submitted Successfully');
        // alert("Feedback Submitted Successfully");
        navigate("/landing");
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="container">
      <h1>Submit Interview Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="interviewId">Interview ID:</label>
          <input
            type="text"
            id="interviewId"
            name="interviewId"
            value={interview_id}
            onChange={(e) => setInterviewId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>
        <button className='btn' type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;