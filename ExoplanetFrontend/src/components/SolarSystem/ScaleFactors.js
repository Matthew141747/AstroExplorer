// ScaleFactors.js
export const scaleFactors = {
    earth: 100, //1 AU is represented as 200 units for Earth's orbit
    mercury: 100 * 0.387, // Mercury's semi-major axis is 0.387 AU
    venus: 100 * 0.723, // Venus's semi-major axis is 0.723 AU
    mars: 100 * 1.524, // Mars's semi-major axis is 1.524 AU
    jupiter: 100 * 5.204 / 8,
    saturn: 100 * 9.58 / 16,
    uranus: 100 * 19.22 / 32,
    neptune: 100 * 30.07 / 64 // Saturn's semi-major axis is 9.58 AU

  };