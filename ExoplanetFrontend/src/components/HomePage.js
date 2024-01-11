import React from "react";
import '../styles/HomePage.css';
import SolarSystemImage from '../images/SolarSystem.png'; 
import ExoplanetsImage from '../images/exoplanetPic.png';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="box">
        <h2>Explore our Solar System</h2>
        <div className="box-image solar-system" style={{ backgroundImage: `url(${SolarSystemImage})` }}></div>
      </div>
      <div className="box">
        <h2>Explore Exoplanets</h2>
        <div className="box-image exoplanets" style={{ backgroundImage: `url(${ExoplanetsImage})` }}></div>
      </div>
    </div>
  );
};

export default HomePage;