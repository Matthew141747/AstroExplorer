import React, { useState, useEffect } from 'react';
import { scaleFactors } from './ScaleFactors';

const calculateMercuryPosition = (daysInYear, currentDayOfYear) => {
    const semiMajorAxis = 0.387; 
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Mercury = ({ period = 88, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setPosition(calculateMercuryPosition(period, dayOfYear));
    }, [date, period]);


   
    const scaleFactor = scaleFactors.mercury;

   
    const orbitRadius = scaleFactor  * 0.387;
    const planetRadius = 2; 

   
    //const viewBoxSize = orbitRadius * 2.5;
    //const viewBox = `-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`;
   
    //            <circle className="orbit" cx="0" cy="0" r={scaleFactor*0.387} stroke="lightgray" fill="none" />

    //            <circle className="planet mercury" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} />


    return (
        <>
        
            <circle className="orbit" cx="0" cy="0" r={orbitRadius} stroke="lightgray" fill="none" />
            
            <circle className="planet mercury" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r={planetRadius} fill="darkgray" />
        </>
    );
};

export default Mercury;
