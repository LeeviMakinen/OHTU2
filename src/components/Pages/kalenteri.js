import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [tripName, setTripName] = useState('');
    const [fetchedTrips, setFetchedTrips] = useState([]);

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
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        fetch('http://localhost:8081/date_ranges')
            .then(res => res.json())
            .then(data => setFetchedTrips(data))
            .catch(err => console.log(err));
    };

    const handleSaveToDatabase = async () => {
        try {
            if (!startDate || !endDate || !tripName) {
                throw new Error('Please select start and end dates and enter a trip name.');
            }

            const response = await fetch('http://localhost:8081/save-dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    tripName: tripName,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save trip to the backend. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Fetch the updated list of trips
            fetchTrips();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTrip = async () => {
        try {
            if (!tripName) {
                throw new Error('Please enter the name of the trip you want to delete.');
            }

            const response = await fetch(`http://localhost:8081/delete-trip/${tripName}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete trip from the backend. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Fetch the updated list of trips
            fetchTrips();
        } catch (error) {
            console.error(error);
        }
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        setTripName('');
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
        <div className="calendar-container">
            <h1>My Calendar</h1>
            <div className="button-container">
                <button onClick={handleSaveToDatabase}>Save Trip</button>
                <button onClick={handleDeleteTrip}>Delete Trip</button>
                <input
                    type="text"
                    placeholder="Enter trip name"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                />
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="selected-dates-container">
                <h2>Selected Dates:</h2>
                <p>Start Date: {startDate ? startDate.toDateString() : 'None'}</p>
                <p>End Date: {endDate ? endDate.toDateString() : 'None'}</p>
            </div>
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
            />
            <div className="trips-container">
                <h2>Trips:</h2>
                <ul>
                    {fetchedTrips.map((trip, index) => (
                        <li key={index}>
                            <span className="trip-name">{trip.TripName}:</span>
                            <span className="trip-dates">{new Date(trip.StartDate).toLocaleDateString()} - {new Date(trip.EndDate).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MyCalendar;
