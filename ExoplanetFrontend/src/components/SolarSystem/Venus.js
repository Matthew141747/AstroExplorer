import React, { useState, useEffect } from 'react';
import { scaleFactors } from './ScaleFactors';


const calculateVenusPosition = (daysInYear, currentDayOfYear) => {
    const semiMajorAxis = 0.723; 
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Venus = ({ period = 224.7, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setPosition(calculateVenusPosition(period, dayOfYear));
    }, [date, period]);

   
    const scaleFactor = scaleFactors.venus;

   
    const orbitRadius = 0.723 * scaleFactor;
    const planetRadius = 2; 

    return (
        <>
           
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
          
            <circle className="planet venus" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} fill="orange" />
        </>
    );
};
export default Venus;

