import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateClick = (value) => {
        if (!startDate) {
            // If start date is not set, set the clicked date as the start date
            setStartDate(value);
            setEndDate(null); // Reset end date
        } else if (!endDate) {
            // If end date is not set, set the clicked date as the end date
            setEndDate(value);
        } else {
            // If both start and end dates are set, reset them and set the clicked date as the start date
            setStartDate(value);
            setEndDate(null);
        }
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
    };

    const tileClassName = ({ date }) => {
        // Apply different styles to tiles based on whether they are the start date, end date, or within the range
        if (startDate && endDate) {
            if (date >= startDate && date <= endDate) {
                return 'selected-range';
            }
        } else if (startDate && date.getTime() === startDate.getTime()) {
            return 'selected-start';
        } else if (endDate && date.getTime() === endDate.getTime()) {
            return 'selected-end';
        }
        return '';
    };

    return (
        <div>
            <h1>My Calendar</h1>
            <div>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div>
                <h2>Selected Dates:</h2>
                <p>Start Date: {startDate ? startDate.toDateString() : 'None'}</p>
                <p>End Date: {endDate ? endDate.toDateString() : 'None'}</p>
            </div>
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
            />
        </div>
    );
}

export default MyCalendar;
