import React, { useState } from "react";
import axios from 'axios';
import '../styles/ExploreExoP.css';
import PlanetComponent from './planetRep';
const ExploreExoP = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [randomResults, setRandomResults] = useState([]);
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${searchTerm}`);
        setSearchResults([response.data]);
      } catch (error) {
        console.error('Error fetching exoplanet data:', error.message);
        setSearchResults([]);
      }
    };
  
    const handleExploreRandom = async () => {
      try {
        const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/');
        const randomPlanets = getRandomElements(response.data.bodies, 4);
        setRandomResults(randomPlanets);
        console.log(randomPlanets);
      } catch (error) {
        console.error('Error fetching random exoplanets:', error.message);
        setRandomResults([]);
      }
    };
  
    const getRandomElements = (array, num) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };
  
    return (
      <div className="container">
        <h1>Explore Exoplanets</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter exoplanet name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
  
        {searchResults.length > 0 && (
          <div className="results-container">
            <h2>Search Results:</h2>
            {searchResults.map((planet) => (
              <div className="planet-card" key={planet.id}>
                <p>{planet.englishName}</p>
                {/* Add more details or images if available */}
              </div>
            ))}
          </div>
        )}
  
        <div className="random-button">
          <button onClick={handleExploreRandom}>Explore Random Exoplanets</button>
        </div>
  
        {randomResults.length > 0 && (
          <div className="results-container">
            <h2>Random Exoplanets:</h2>
            {randomResults.map((planet) => (
              <div className="planet-card" key={planet.id}>
                <PlanetComponent
                  meanRadius={planet.meanRadius}
                  color={planet.color}
                  type={planet.type}
                  bodyType={planet.bodyType}
                  discoveredBy={planet.discoveredBy}
                  discoveryDate={planet.discoveryDate}
                  alternativeName={planet.alternativeName}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default ExploreExoP;
