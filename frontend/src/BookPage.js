
import { useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";

function BookPage() {
    let [formData, setFormData] = useState({});
    let [message, setMessage] = useState(null);

    // Use Effect to submit the data
    useEffect(() => {
        if (Object.keys(formData).length === 0) return
        const fetchData = async () => {
            let response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({...formData})
            });
            if(response.status === 201) {
                setMessage('Booking Accepted!')
            }
            

        }

        fetchData()
    }, [formData])

    return (
        <div>
            {!message && <BookingForm handler={setFormData}/>}
            {message && <div className="confirmationMessage"><h2>{message}</h2><h3>Name: {formData.name}</h3><h3>Email: {formData.email}</h3><h3>Number: {formData.phone}</h3><h3>Address: {formData.address}</h3><h3>Date: {String(formData.date).split('00:')[0]}</h3><h3>Time: {formData.time}</h3></div>}
            
        </div>
    )
}

export default BookPage;