import React, { useEffect, useRef } from 'react';


const PlanetComponent = ({ meanRadius, color, type, bodyType, discoveredBy, discoveryDate, alternativeName }) => {
  const canvasRef = useRef(null);
  const fixedContainerSize = 150; // Set your fixed container size

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawPlanet(ctx);
    // drawTextLabels is removed because we will handle it in the JSX instead
  }, [meanRadius, color, bodyType]);

  const drawPlanet = (ctx) => {
    ctx.clearRect(0, 0, fixedContainerSize, fixedContainerSize); // Clear previous drawings
    const radius = meanRadius ? Math.min(meanRadius, fixedContainerSize / 2) : fixedContainerSize / 4;
    ctx.beginPath();
    ctx.arc(fixedContainerSize / 2, fixedContainerSize / 2, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color || 'grey'; // Fallback to grey if no color
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div className="planet-card">
      <div className="planet-image" style={{ width: fixedContainerSize, height: fixedContainerSize }}>
        <canvas ref={canvasRef} width={fixedContainerSize} height={fixedContainerSize} />
      </div>
      <div className="planet-info">
        <p>Discovered by: {discoveredBy || 'N/A'}</p>
        <p>Discovery Date: {discoveryDate || 'N/A'}</p>
        <p>Alternative Name: {alternativeName || 'N/A'}</p>
        <p>Type: {type || 'N/A'}</p>
        <p>Body Type: {bodyType || 'N/A'}</p>
        {/* Add more details here as they become available */}
      </div>
    </div>
  );
};

export default PlanetComponent;