import React, { useState, useEffect } from 'react';
import { scaleFactors } from './ScaleFactors';


const calculateUranusPosition = (daysInYear, currentDayOfYear) => {
    const semiMajorAxis = 19.22; 
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Uranus = ({ period = 30660, date }) => { 
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!date) return; 
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setPosition(calculateUranusPosition(period, dayOfYear));
    }, [date, period]);

   
    const scaleFactor = scaleFactors.uranus;

    
    const orbitRadius = scaleFactor * 19.22; 
    const planetRadius = 4; 
    return (
        <>
           
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
          
            <circle className="planet uranus" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} fill="lightblue" />
        </>
    );
};

export default Uranus;
