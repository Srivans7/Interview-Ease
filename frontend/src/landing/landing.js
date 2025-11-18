import React, { useState, useEffect } from "react";
// import Navbar from '../navbar/navbar';
import JobCard from "../jobcard/jobcard";
import "./landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [jobCards, setJobCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all job cards from backend API
    fetch("http://127.0.0.1:4000/vacancy/getvacancy")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch job cards");
        }
        return response.json();
      })
      .then((data) => {
        setJobCards(data); // Update job cards state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching job cards:", error);
      });
  }, []); // Empty dependency array means this effect runs once on component mount
  const handleHome=()=>{
    navigate("/status")
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div>
      <div className="job-container">
        <div>
          <h1 style={{width:"90vw"}}>
      <button onClick={handleHome} style={{width:"100px", float:"left",}}>Status</button>
            Number of Job Applications which is availbale now: {jobCards.length}{" "}
            <button onClick={handleLogout} style={{width:"100px", float:"right",}}>LogOut</button>
          </h1>
          <br />
        </div>
      </div>
      <div className="job-container">
        {/* Render all job cards */}
        {jobCards.map((job) => (
          <JobCard
            key={job.id} // Assuming each job card has a unique ID
            title={job.position}
            description={job.description}
            location={job.availability}
            salary={"xxxx"}
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;
