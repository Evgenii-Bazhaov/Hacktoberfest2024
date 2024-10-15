import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <h1 className="home-title">Welcome to the Book Manager</h1>
          <p className="home-description">
            Manage your book collection effortlessly with our intuitive system.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
