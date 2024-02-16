import React, { useState, useEffect } from 'react';

// Helper function to calculate Earth's position in orbit
const calculateEarthPosition = (semiMajorAxis, daysInYear, currentDay) => {
    // Convert current day to radians
    const radians = (2 * Math.PI / daysInYear) * currentDay;
    // Calculate x and y positions for a circular orbit
    const x = semiMajorAxis * Math.cos(radians);
    const y = semiMajorAxis * Math.sin(radians);
    return { x, y };
};

const EarthOrbit = ({ period = 365.25, semiMajorAxis = 1, eccentricity = 0.0167, date }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // The desired orbit radius in SVG units for Earth
    // This can be adjusted to fit the scale of your simulation
    const desiredOrbitRadiusSVGUnitsForEarth = 200; // This is an example value
    // The actual average orbital distance of Earth from the Sun in AU
    const actualSemiMajorAxisAUForEarth = 1; // Earth's average distance to the Sun is defined as 1 AU
    // The scale factor to apply to Earth to match the desired visual representation
    const scaleFactorForEarth = desiredOrbitRadiusSVGUnitsForEarth / actualSemiMajorAxisAUForEarth;

    useEffect(() => {
        // Logic to calculate Earth's position
        const updatePosition = () => {
            const start = new Date(date.getFullYear(), 0, 0);
            const diff = date - start;
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);

            const newPos = calculateEarthPosition(semiMajorAxis, period, dayOfYear);
            setPosition(newPos);
        };

        updatePosition();
    }, [date, period, semiMajorAxis, eccentricity]);

    // Define the size of the viewBox based on the scaled semi-major axis
    const viewBoxSize = 2 * scaleFactorForEarth * semiMajorAxis;
    const viewBox = `-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`;

    return (
        <svg width="100%" height="100%" viewBox={viewBox}>
            <circle className="orbit" cx="0" cy="0" r={semiMajorAxis * scaleFactorForEarth} stroke="lightgray" fill="none" />
            <circle className="planet earth" cx={position.x * scaleFactorForEarth} cy={position.y * scaleFactorForEarth} r="5" />
        </svg>
    );
};
export default EarthOrbit;