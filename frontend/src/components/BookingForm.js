
import { useState } from "react";
import BookingCalendar from "./BookingCalendar";

function BookingForm(props) {

    let [slot, setSlot] = useState(null);
    let [formData, setFormData] = useState({})


    function handleCalendar(day, hour) {
        setSlot({date:day, time: hour});
    }

    function handleForm(e) {
        e.preventDefault()
        if (!slot) {
            console.log('must choose slot');
            return
        }
        let name = e.target.form.name.value;
        let email = e.target.form.email.value;
        let phone = e.target.form.phone.value;
        let address = e.target.form.address.value;

        // call props, pass data up to parent
        props.handler({...slot, name, email, phone, address})
    }

    return (
        <div className="bookingContainer">
            <BookingCalendar handler ={handleCalendar}/>
            <form>
                <label for='name'>Name</label>
                <br />
                <input type='text' placeholder="Enter your name" name="name" required />
                <br />
                <label for='email'>Email</label>
                <br />
                <input type='email' placeholder="Enter your email" name="email" required />
                <br />
                <label for='phone'>Phone</label>
                <br />
                <input type='phone' placeholder="Enter your phone number" name="phone" required />
                <br />
                <label for='address'>Address</label>
                <br />
                <input type='text' placeholder="Enter your address" name="address" required />
                <br />
                <input type="submit" value='Book' onClick={e => handleForm(e)}/>
            </form>
        </div>

    )
}

export default BookingForm;