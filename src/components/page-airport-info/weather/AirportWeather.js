import { useEffect, useState } from "react"

export const AirportWeather = ({airportId}) => {
    
    const [currentMETAR, setCurrentMETAR] = useState({})

    // for useEffect, possibly reference AirportComments.js. Though that schema may not be needed until *after* a "plain text" button is added

    return (
        <div className="airport__weather">
            <h3 className="weather__header">Current and Forecasted Weather</h3>
        </div>
    )
}

