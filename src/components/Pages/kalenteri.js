import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './pages.css';
import {paikallinenIP} from "./VAIHDATÄMÄ";
function MyCalendar() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [tripName, setTripName] = useState('');
    const [fetchedTrips, setFetchedTrips] = useState([]);


    const tempIP = paikallinenIP;

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
        fetch(tempIP+'/date_ranges')
            .then(res => res.json())
            .then(data => setFetchedTrips(data))
            .catch(err => console.log(err));
    };

    const handleSaveToDatabase = async () => {
        try {
            if (!startDate || !endDate || !tripName) {
                throw new Error('Please select start and end dates and enter a trip name.');
            }

            const response = await fetch(tempIP+'/save-dates', {
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
            let tripToDelete = tripName;
            // Check if input is a number
            if (!isNaN(tripToDelete)) {
                const index = parseInt(tripToDelete) - 1;
                // Check if index is valid
                if (index >= 0 && index < fetchedTrips.length) {
                    tripToDelete = fetchedTrips[index].TripName;
                } else {
                    throw new Error('Invalid trip index');
                }
            }

            const response = await fetch(tempIP+`/delete-trip/${tripToDelete}`, {
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
        <div className="post">
            <div className="container">
                <h1>Hirvimetsän tapahtumakalenteri</h1>
                <div className="button-container">
                    <button className={"uploadtext"} onClick={handleSaveToDatabase}>Tallenna</button>
                    <button className={"uploadtext"} onClick={handleDeleteTrip}>Poista</button>

                    <input
                        type="text"
                        placeholder="Syötä matkan nimi tai Id"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                    />
                    <button className={"uploadtext"} onClick={handleReset}>Tyhjennä</button>
                </div>
                <div className="selected-dates-container">
                    <h2>Valihe päivät:</h2>
                    <p>Matkan alkupäivä: {startDate ? startDate.toDateString() : 'None'}</p>
                    <p>Ja millon tullaan takaisin?: {endDate ? endDate.toDateString() : 'None'}</p>
                </div>
                <Calendar
                    onClickDay={handleDateClick}
                    tileClassName={tileClassName}
                />
                <div className="trips-container">
                    <h2>Sovitut päivät:</h2>
                    <ul>
                        {fetchedTrips.map((trip, index) => (
                            <li key={index}>
                                <span className="trip-index">{index + 1}:</span>
                                <span className="trip-name">{trip.TripName}:</span>
                                <span
                                    className="trip-dates">{new Date(trip.StartDate).toLocaleDateString()} - {new Date(trip.EndDate).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default MyCalendar;
