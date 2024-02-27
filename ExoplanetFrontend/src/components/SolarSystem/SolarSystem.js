import React, { useState} from 'react';
import EarthOrbit from './Earth';
import TimeControl from './TimeControl';
import '../../styles/SolarSystem/SolarSystem.css';
import MercuryOrbit from './Mercury';
import VenusOrbit from './Venus';
import MarsOrbit from './Mars';
import JupiterOrbit from './Jupiter';
import SaturnOrbit from './Saturn';
import UranusOrbit from './Uranus';
import NeptuneOrbit from './Neptune';
import { scaleFactors } from './ScaleFactors';




const SolarSystem = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const viewBoxSize = 2 * scaleFactors.neptune * 30.07;
    //const viewBoxSize = 2 * scaleFactors.jupiter * 5.204; 
   // const viewBoxSize = 2 * scaleFactors.mars * 1.524;
    const viewBox = `-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

   
    return (
        <div>
            <TimeControl onDateChange={handleDateChange} />
            <svg width="100%" height="100%" viewBox={viewBox} >
                <circle className="sun" cx="50%" cy="50%" r="10" />
                <MercuryOrbit date={selectedDate} />
                <VenusOrbit date={selectedDate} />
                <EarthOrbit date={selectedDate} />
                <MarsOrbit date={selectedDate}/>
                <JupiterOrbit date = {selectedDate}/>
                <SaturnOrbit date = {selectedDate}/>
                <UranusOrbit date = {selectedDate}/>
                <NeptuneOrbit date = {selectedDate}/>
              
            </svg>
        </div>
    );
};

export default SolarSystem;
