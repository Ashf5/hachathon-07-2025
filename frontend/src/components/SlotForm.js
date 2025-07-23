
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

function SlotForm(props) {
    let [time, setTime] = useState(null);

    return (
        <div>
            <TimePicker
                onChange={setTime}
                value={time}
                disableClock={true}
            />
            <br />
            {time && <button onClick={() => props.handler(time)}>Confirm {time}</button> }
        </div>
    )

}

export default SlotForm;