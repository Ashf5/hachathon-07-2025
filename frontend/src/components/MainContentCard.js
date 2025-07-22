
import {useNavigate} from 'react-router-dom'

function MainContentCard() {
    let navigate = useNavigate();
    function handleClick() {
        navigate('/book')
    }

    return (
        <div className="cardContainer">
            <div className="card">
                <h1>Transform your home with our Power Washing Services</h1>
                <p>Revitalize your property's appearance with our professional power washing. We specialize in cleaning driveways, siding, decks, and more, ensuring a spotless finish.</p>
                <button onClick={handleClick}>Book</button>
            </div>
        </div>
    )
}

export default MainContentCard;