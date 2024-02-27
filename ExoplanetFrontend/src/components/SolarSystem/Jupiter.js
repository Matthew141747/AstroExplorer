import React, { useState, useEffect } from 'react';
import { scaleFactors } from './ScaleFactors';


const calculateJupiterPosition = (daysInYear, currentDayOfYear) => {
    const semiMajorAxis = 5.204; 
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Jupiter = ({ period = 4333, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setPosition(calculateJupiterPosition(period, dayOfYear));
    }, [date, period]);

    const scaleFactor = scaleFactors.jupiter;

    const orbitRadius = 5.204 * scaleFactor; 
    const planetRadius = 5;

    return (
        <>
        
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
       
            <circle className="planet jupiter" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} fill="sandybrown" />
        </>
    );
};

export default Jupiter;
