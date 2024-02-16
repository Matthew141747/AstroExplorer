import React, { useState, useEffect } from 'react';

// Helper function to calculate Mercury's position in orbit
const calculateMercuryPosition = (semiMajorAxis, daysInYear, currentDayOfYear) => {
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Mercury = ({ period = 88, semiMajorAxis = 0.387, eccentricity = 0.206, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const newPosition = calculateMercuryPosition(semiMajorAxis, period, dayOfYear);
        setPosition(newPosition);
    }, [date, period, semiMajorAxis, eccentricity]);
    
    const actualSemiMajorAxisAU = 0.387; 
    const desiredOrbitRadiusSVGUnits = 100; 
    const scaleFactor = desiredOrbitRadiusSVGUnits / actualSemiMajorAxisAU;

    const viewBoxSize = 2 * Math.max(window.innerWidth, window.innerHeight);
    const viewBox = `-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`;

    return (
        <svg width="100%" height="100%" viewBox={viewBox}>
            <circle className="orbit" cx="0" cy="0" r={semiMajorAxis * scaleFactor} stroke="lightgray" fill="none" />
            <circle className="mercury" cx={position.x * scaleFactor} cy={position.y * scaleFactor} r="2" />
        </svg>
    );
};

export default Mercury;
