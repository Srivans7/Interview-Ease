import React, { useState } from 'react';
import './apply.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const ApplyNow = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [cover_letter, setCoverLetter] = useState('');
  const [vacancy_id, setVacancyId] = useState('');
  const [resume_path, setResume] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');


  const handleSubmit = async (e) => {

    e.preventDefault();

    const postData = {
      firstname,middlename,lastname,gender,email,cover_letter,vacancy_id,resume_path,address,contact
    }

    const AppFormUrl = "http://127.0.0.1:4000/application/form";
    try {
      const response = await fetch(AppFormUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      
     
      const data = await response.json();
      console.log(data);
      if(response.ok){
        localStorage.setItem('email',postData.email);
        localStorage.setItem('vacancy',postData.vacancy_id);
        console.log('Form Filled Successfully');
        navigate("/ThankYou");
      }else{
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <h1>Apply Now for Job Interview</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="middlename">Middle Name:</label>
          <input
            type="text"
            id="middlename"
            name="middlename"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter:</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={cover_letter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="vacancyId">Vacancy ID:</label>
          <input
            type="text"
            id="vacancyId"
            name="vacancyId"
            value={vacancy_id}
            onChange={(e) => setVacancyId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume:</label>
          <input
            type="text"
            id="resume"
            name="resume"
            value={resume_path}
            onChange={(e) => setResume(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className='btn'>Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyNow;