
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';

function BookingCalendar(props) {
    let [availableDays, setAvailableDays] = useState([]);
    let [selectedDay, setSelectedDay] = useState(null);
    let [availableSlots, setAvailableSlots] = useState([]);
    let [selectedSlot, setSlot] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/available')
            .then(data => data.json())
            .then(jsonData => setAvailableDays(jsonData));
    }, []);

    const isAvailable = (date) => {
        const dateISO = date.toISOString().split('T')[0];
        return availableDays.includes(dateISO)
    }

    const updateCalendar = (e) => {
        setSelectedDay(e);
        const dateISO = e instanceof Date ? e.toISOString().split('T')[0]: e;
        fetch('http://localhost:5000/api/available-slots', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: dateISO
            })
        }).then(data => data.json()).then(clean => {setAvailableSlots(clean)})

    }

    return (
        <div>
            <Calendar 
                onChange={e => updateCalendar(e)}
                minDetail="month"
                maxDetail="month"
                tileDisabled={({date, view}) => view === 'month'? !isAvailable(date): undefined} 
            />

            {selectedDay && !selectedSlot &&
                <div> 
                    <h2>Select a time</h2>
                    <ul>
                        {availableSlots.map((slot, i) => <button key={i} onClick={(e) => setSlot(e.target.value)} value={slot}>{slot}</button>)}
                    </ul>
                    
                </div>
            }

            {
                selectedSlot && <div>
                    <h3>Your time slot: {selectedSlot}</h3>
                    <button onClick={e => props.handler(selectedDay, selectedSlot)}>Confirm</button>
                </div>
            }
        </div>
    )
}

export default BookingCalendar;