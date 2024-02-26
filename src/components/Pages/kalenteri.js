import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateClick = (value) => {
        const newSelectedDates = [...selectedDates];

        // Toggle the selected state of the clicked date
        const index = newSelectedDates.findIndex((date) => date.getTime() === value.getTime());
        if (index === -1) {
            newSelectedDates.push(value);
        } else {
            newSelectedDates.splice(index, 1);
        }

        setSelectedDates(newSelectedDates);
    };

    const handleReset = () => {
        setSelectedDates([]);
    };

    const tileClassName = ({ date, view }) => {
        // Check if the date is in the list of selected dates
        if (selectedDates.some((selectedDate) => selectedDate.getTime() === date.getTime())) {
            return 'selected-day';
        }
        return '';
    };

    return (
        <div>
            <h1>My Calendar</h1>
            <div>
                <button onClick={handleReset}>Reset</button>
            </div>
            <Calendar
                onChange={handleDateClick}
                value={selectedDates}
                tileClassName={tileClassName}
            />
        </div>
    );
}

export default MyCalendar;