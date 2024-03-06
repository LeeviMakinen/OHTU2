import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fetchedDates, setFetchedDates] = useState([]);

    const handleDateClick = (value) => {
        if (!startDate) {
            setStartDate(value);
            setEndDate(null);
        } else if (!endDate) {
            setEndDate(value);
        } else {
            setStartDate(value);
            setEndDate(null);
        }
    };

    useEffect(() => {
        fetch('http://localhost:8081/date_ranges')
            .then(res => res.json())
            .then(data => setFetchedDates(data))
            .catch(err => console.log(err));
    }, []);

    const handleSaveToDatabase = async () => {
        try {
            // Assuming startDate and endDate are Date objects
            const response = await fetch('http://localhost:8081/save-dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save dates to the backend. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
    };

    const tileClassName = ({ date }) => {
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
                <button onClick={handleSaveToDatabase}>Save to Database</button>
            </div>
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
            <div>
                <h2>Reissut:</h2>
                <p>
                    {fetchedDates.map(dateObj => {
                        const startDate = new Date(dateObj.StartDate).toLocaleDateString();
                        const endDate = new Date(dateObj.EndDate).toLocaleDateString();
                        return `${startDate} - ${endDate}`;
                    }).join(', ')}
                </p>
            </div>
        </div>
    );
}

export default MyCalendar;