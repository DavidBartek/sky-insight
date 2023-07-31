import { useEffect, useState } from "react"
import { fetchMETAR, fetchTAF } from "../../../DataAccess"

export const AirportWeather = ({airportId}) => {
    
    const [currentMETAR, setCurrentMETAR] = useState({})
    const [currentTAF, setCurrentTAF] = useState({})

    // for useEffect, possibly reference AirportComments.js. Though that schema may not be needed until *after* a "plain text" button is added

    useEffect(
        () => {
            fetchMETAR(airportId)
                .then((data) => {
                    setCurrentMETAR(data)
                    console.log(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetchTAF(airportId)
                .then((data) => {
                    setCurrentTAF(data)
                    console.log(data)
                })
        },
        []
    )
    
    if (!currentMETAR || !currentTAF) {
        return null
    } else {
        return (
            <div className="airport__weather">
                <h3 className="weather__header">Current and Forecasted Weather</h3>
            </div>
        )
    }
}

