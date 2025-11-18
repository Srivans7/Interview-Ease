import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/Signup';
import JobCard from './jobcard/jobcard';
// import Navbar from './navbar/navbar';
import Landing from './landing/landing';
import ApplyNow from './apply/ApplyNow';
import Vacancy from './vacancy/Vacancy';
import Feedback from './feedback/Feedback';
import ThankYou from './thankyou/ThankYou';
import Status from './status/status';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobcard" element={<JobCard />} />
        {/* <Route path="/navbar" element={<Navbar/>} /> */}
        <Route path="/ApplyNow" element={<ApplyNow/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/vacancy" element={<Vacancy/>} />
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/ThankYou" element={<ThankYou/>}/>
        <Route path="/status" element={<Status/>}/>

        {/* Redirect to the login page if no matching route found */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;


