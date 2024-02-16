import React, { useState } from 'react';

const TimeControl = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        onDateChange(new Date(newDate));
    };

    return (
        <div className="time-control">
            <label htmlFor="datePicker">Select a date: </label>
            <input
                type="date"
                id="datePicker"
                value={date}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default TimeControl;
