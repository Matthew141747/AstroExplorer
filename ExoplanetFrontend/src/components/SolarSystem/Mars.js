import React, { useState, useEffect } from 'react';
import { scaleFactors} from './ScaleFactors';

const calculateMarsPosition = (semiMajorAxis, daysInYear, currentDayOfYear) => {
    // Mars position calculation
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Mars = ({ period = 687, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24);
        const newPosition = calculateMarsPosition(1.524, period, dayOfYear); 
        setPosition({
            x: newPosition.x * scaleFactors.mars,
            y: newPosition.y * scaleFactors.mars
        });
    }, [date, period]);

  
    const orbitRadius = 1.524 * scaleFactors.mars; 
    const planetRadius = 2; 

    return (
        <>
 
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
           
            <circle className="planet mars" cx={position.x * scaleFactors.mars} cy={position.y * scaleFactors.mars} r={planetRadius} fill="red" />
        </>
    );
};

export default Mars;

