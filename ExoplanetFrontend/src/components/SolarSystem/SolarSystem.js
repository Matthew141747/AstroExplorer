import React, { useState} from 'react';
import EarthOrbit from './Earth';
import TimeControl from './TimeControl';
import '../../styles/SolarSystem/SolarSystem.css';
import MercuryOrbit from './Mercury';
import VenusOrbit from './Venus';

const SolarSystem = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="solar-system">
            <TimeControl onDateChange={handleDateChange} />
            <svg width="100%" height="800" style={{ backgroundColor: 'black', position: 'relative' }}>
                <circle className="sun" cx="50%" cy="50%" r="10" />
                
                <g transform="translate(50%, 50%)">
                    <MercuryOrbit period={88} semiMajorAxis={0.387} eccentricity={0.206} date={selectedDate} />
                    <VenusOrbit period={224.7} semiMajorAxis={0.723} eccentricity={0.0067} date={selectedDate} />
                    <EarthOrbit period={365.25} semiMajorAxis={100} eccentricity={0.0167} date={selectedDate} />
                </g>
            </svg>
        </div>
    );
};
export default SolarSystem;
