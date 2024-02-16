import React, { useState, useEffect } from 'react';

// function to calculate Venus's position in orbit
const calculateVenusPosition = (semiMajorAxis, daysInYear, currentDayOfYear) => {
    const radians = (2 * Math.PI / daysInYear) * currentDayOfYear;
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const Venus = ({ period = 224.7, semiMajorAxis = 0.723, eccentricity = 0.0067, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const newPosition = calculateVenusPosition(semiMajorAxis, period, dayOfYear);
        setPosition(newPosition);
    }, [date, period, semiMajorAxis, eccentricity]);

    // The actual average orbital distance of Venus from the Sun in AU
    const actualSemiMajorAxisAUForVenus = 0.723;
    // The desired orbit radius in SVG units for Venus
    const desiredOrbitRadiusSVGUnitsForVenus = 150;
    // The scale factor to apply to Venus to match the desired visual representation
    const scaleFactorForVenus = desiredOrbitRadiusSVGUnitsForVenus / actualSemiMajorAxisAUForVenus;

    const viewBoxSize = 2 * Math.max(window.innerWidth, window.innerHeight);
    const viewBox = `-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`;

    return (
        <svg width="100%" height="100%" viewBox={viewBox}>
            <circle className="orbit" cx="0" cy="0" r={semiMajorAxis * scaleFactorForVenus} stroke="lightgray" fill="none" />
            <circle className="planet venus" cx={position.x * scaleFactorForVenus} cy={position.y * scaleFactorForVenus} r="4" />
        </svg>
    );
};

export default Venus;
