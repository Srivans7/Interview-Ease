import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  if(localStorage.getItem("token")) navigate("/landing");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      email: email,
      password: password
    };
    const loginUrl = "http://127.0.0.1:4000/candidate/signin";
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      // const data = await response.json();
      if(response.ok){
        console.log('Login successful. Response:');
        const data = await response.json();
        // console.log(data.data.secret);
        localStorage.setItem("token",data.data.secret);
        navigate("/landing");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  const handleAdmin = ()=>{
    navigate("/vacancy");       
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
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
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn' type="submit">Login</button>
        <button className='btn' onClick={handleAdmin}>Login as Admin</button>
      </form>
      <p>Don't have an account? <Link to="/Signup">Signup</Link></p>
    </div>
  );
};

export default Login;
