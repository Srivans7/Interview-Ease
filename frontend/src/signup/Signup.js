import React, { useState } from 'react';
import './signup.css'; // Importing the CSS file for styling
import { Link , useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [resume , setResume] = useState('');

  
  const navigate = useNavigate();

  if(localStorage.getItem("token")) navigate("/landing");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      name : name,
      email: email,
      password: password,
      address : address,
      phone_number : phone_number,
      resume : resume
    };
    const SignUpUrl = "http://127.0.0.1:4000/candidate/signup";
    try {
      const response = await fetch(SignUpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      console.log(data);
      if(response.ok){
        console.log('SignUp Sucess. Response:');
        navigate("/SignIn");
      }else{
        alert("Invalid SignUp");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume:</label>
          <input
            type="text"
            id="resume"
            name="resume"
            placeholder="Enter your Resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
          />
        </div>
        <button className='btn' type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
