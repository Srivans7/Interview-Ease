// import React, { useState, useEffect } from 'react';
// import './thankYou.css'; // Import CSS file

// import { useNavigate } from 'react-router-dom';

// const ThankYou = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState(localStorage.getItem('email'));
//   const [vacancy, setVacancy] = useState(localStorage.getItem('vacancy'));
//   const [interview_id, setInterview_Id] = useState(null);
//   // const [interview_id]
//   //  const email = localStorage.getItem('email')
//    console.log(email);
//   // Function to fetch interview ID from the server

//   const getInterviewId = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:4000/vacancy/getId/${email}/${vacancy}`);
//       const data = await response.json();
//       console.log(data[0].id)
//       setInterview_Id(data[0].id); // Assuming the response contains the interview ID
//     } catch (error) {
//       console.error('Error fetching interview ID:', error);
//     }
//   };

//   // Fetch interview ID when the component mounts
//   useEffect(() => {
//     setEmail(localStorage.getItem("email"));
//     setVacancy(localStorage.getItem("vacancy"));
//     getInterviewId()
//   },[]);

//   return (
//     <>
//   <div className="thank-you-container">
//       <h1>Thank You</h1>
//       {interview_id ? (
//         <p>Thank you for submitting your application! Your interview ID is: <b>{interview_id}</b></p>
//       ) : (
//         <p>Thank you for submitting your application!</p>
//       )}

     
//     </div>
//     <br/><br/>
//     <button onClick={(e)=>navigate("/Landing")} style={{width: "150px",marginLeft: "auto" , marginRight:"auto" ,display:"flex" , justifyContent:"center"}}>Back to Home</button>

//     </>
    
//   );
// };

// export default ThankYou;

import React, { useState, useEffect, useCallback } from 'react';
import './thankYou.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [vacancy, setVacancy] = useState(localStorage.getItem('vacancy'));
  const [interview_id, setInterview_Id] = useState(null);

  const getInterviewId = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/vacancy/getId/${email}/${vacancy}`);
      const data = await response.json();
      console.log(data[0].id);
      setInterview_Id(data[0].id);
    } catch (error) {
      console.error('Error fetching interview ID:', error);
    }
  }, [email, vacancy]); // Include email and vacancy as dependencies

  // Fetch interview ID from the server
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setVacancy(localStorage.getItem("vacancy"));
    getInterviewId(); // Call the memoized function inside useEffect
  }, [getInterviewId]); // Include getInterviewId as a dependency

  return (
    <>
      <div className="container">
        <h1>Thank You</h1>
        {interview_id ? (
          <p>Thank you for submitting your application! Your interview ID is: <b>{interview_id}</b></p>
        ) : (
          <p>Thank you for submitting your application!</p>
        )}
      </div>
      <br/><br/>
      <button className='btn' onClick={(e) => navigate("/landing")} style={{ width: "150px", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>Go to Home</button>
    </>
  );
};

export default ThankYou;
