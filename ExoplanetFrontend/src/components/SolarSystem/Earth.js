import React, { useState, useEffect } from 'react';
import { scaleFactors } from './ScaleFactors';


const calculateEarthPosition = (daysInYear, currentDay) => {
    const semiMajorAxis = 1; 
    const radians = (2 * Math.PI / daysInYear) * currentDay;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Earth = ({ period = 365.25, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setPosition(calculateEarthPosition(period, dayOfYear));
    }, [date, period]);

    const scaleFactor = scaleFactors.earth;

    const orbitRadius = 1 * scaleFactor; 
    const planetRadius = 2; 

    return (
        <>
          
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
         
            <circle className="planet earth" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} fill="blue" />
        </>
    );
};

export default Earth;


