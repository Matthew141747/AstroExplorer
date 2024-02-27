import React, { useState, useEffect } from 'react';
import { scaleFactors } from './ScaleFactors';


const calculateSaturnPosition = (daysInYear, currentDayOfYear) => {
    const semiMajorAxis = 9.58; 
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Saturn = ({ period = 10759, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setPosition(calculateSaturnPosition(period, dayOfYear));
    }, [date, period]);

  
    const scaleFactor = scaleFactors.saturn;

   
    const orbitRadius = 9.58 * scaleFactor; 
    const planetRadius = 4; 

    return (
        <>
          
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
          
            <circle className="planet saturn" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} fill="goldenrod" />
        </>
            );
        };
        
export default Saturn;