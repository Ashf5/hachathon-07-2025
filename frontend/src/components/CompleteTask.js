import { useEffect, useState } from "react"


function CompleteTask(props) {
    let [bookings, setBookings] = useState([]);

    useEffect(()=> {
        const getBookings = async () => {
            let response = await fetch('http://localhost:5000/api/bookings');
            if (response.status !== 200) {
                alert('Error fetching bookings');
                return;
            }
            let bookings = await response.json();
            setBookings(bookings);
            
        }
        getBookings()

    }, [])

    function completedHandler(e) {
        console.log(bookings)
        let id = bookings[e.target.name].id;
        const updateStatus = async () => {
            let response = await fetch(`http://localhost:5000/api/bookings/status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'completed'
                })
            })
            if (response.status === 201) {
                let copy = bookings.map(booking => ({...booking}));
                copy[e.target.name].status = 'completed'
                setBookings(copy);
            }
        }
        updateStatus()
    }

    return (
        <div>
            <ul>
                {bookings.map((booking, i) => <li key={i}>{booking.name} {booking.email} {booking.phone} {booking.address} {booking.date} {booking.start_time} {booking.status} <button onClick={completedHandler} name={i}>Mark Completed</button></li>)}
            </ul>
            
        </div>
    )
}

export default CompleteTask;