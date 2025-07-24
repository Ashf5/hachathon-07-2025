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

    return (
        <div>
            <ul>
                {bookings.map((booking, i) => <li key={i}>{booking.name} {booking.email} {booking.phone} {booking.address} {booking.date} {booking.start_time} {booking.status} <button>Mark Completed</button></li>)}
            </ul>
            
        </div>
    )
}

export default CompleteTask;