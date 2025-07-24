
import {  useState } from "react"
import Calendar from "react-calendar"
import SlotForm from "./SlotForm";

function CreateSlot() {

    let [selectedDay, updateSelected] = useState(null);
    let [slotsCreated, setCreated] = useState([]);

    // Hard code end time for now
    let slotEnd = '00:00';



    // This function gets and shows all created slots for day
    const updateHour = (e) => {
        updateSelected(e);
        fetch('http://localhost:5000/api/available-slots', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: e,
                is_booked: true
            })
        }).then(data => data.json()).then(clean => {setCreated(clean)});

    }

    // This function creates new slot
    const makeSlot = (time) => {
        const mSlot = async () => {
            const dateISO = selectedDay instanceof Date ? selectedDay.toISOString().split('T')[0]: selectedDay;
            let data = await fetch('http://localhost:5000/api/available', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    date: dateISO,
                    start_time: time,
                    end_time: slotEnd
                })
            })
            if (data.status === 201) {
                let json = await data.json();
                console.log(json)
                setCreated([...slotsCreated, time]);
            }else{
                alert('Error creating new slot');
                console.log(data.status);
            }
        }
        mSlot()
    }

    return (
        <div>
            <div className="slotCalendar">
                <Calendar 
                onChange={e => updateHour(e)}
                minDetail="month"
                maxDetail="month"
                locale='IL'
            />
            </div>
            <div>
                {selectedDay && <h2>Your created slots:</h2>}
                <ul>
                    {slotsCreated.map(slot => <li>{slot}</li>)}
                    {slotsCreated.length === 0 && selectedDay && <li>No slots for today</li>}
                </ul>
            </div>
            {selectedDay && <SlotForm handler={makeSlot}/>}
        </div>
    )
}

export default CreateSlot;