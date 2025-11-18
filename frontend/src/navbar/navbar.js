// Navbar.js

import React from 'react';
import './navbar.css'; // Importing the CSS file for styling
const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="logo"><a href="logo.svg">Interify</a></div>
        <ul className="menu">
          <li><a href="#Home">Home</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Category">Category</a></li>
          <li><a href="#Contact">Contact</a></li>
          <li><a href="#Feedback">Feedback</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
