import React, { useState, useMemo } from 'react';

const TimeControl = ({ onDateChange }) => {
    // Initialize the slider with the current year and month as the default value
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); 
    const initialSliderValue = (currentYear - 2022) * 12 + currentMonth; 
    const [sliderValue, setSliderValue] = useState(initialSliderValue);

    const [isMinimized, setIsMinimized] = useState(false); // State to track if the control is minimized

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized); 
    };

    // Calculate the date from the slider value
    const calculateDateFromSlider = (sliderValue) => {
        const sliderYear = Math.floor(sliderValue / 12) + 2022;
        const sliderMonth = sliderValue % 12;
        return new Date(sliderYear, sliderMonth).toISOString().split('T')[0];
    };

    const [date, setDate] = useState(calculateDateFromSlider(initialSliderValue));

    const handleSliderChange = (e) => {
        const newSliderValue = e.target.value;
        setSliderValue(newSliderValue);
        const newDate = calculateDateFromSlider(newSliderValue);
        setDate(newDate);
        onDateChange(new Date(newDate));
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        const newDateObject = new Date(newDate);
        const newSliderValue = (newDateObject.getFullYear() - 2022) * 12 + newDateObject.getMonth();
        setSliderValue(newSliderValue);
        onDateChange(newDateObject);
    };

  return (
        <div className={`time-control ${isMinimized ? 'minimized' : ''}`}>
            {!isMinimized && ( 
                <>
                    <label htmlFor="dateSlider">Select a month:</label>
                    <input
                        type="range"
                        id="dateSlider"
                        min="0"
                        max="60"
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                    <label htmlFor="datePicker">Select a date: </label>
                    <input
                        type="date"
                        id="datePicker"
                        value={date}
                        onChange={handleDateChange}
                    />
                </>
            )}
            <button onClick={toggleMinimize}>
                {isMinimized ? 'Maximize' : 'Minimize'}
            </button>
        </div>
    );
};

export default TimeControl;