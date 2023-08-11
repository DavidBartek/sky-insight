import { useEffect, useState } from "react"
import { fetchFrequencies } from "../../../DataAccess"
import { Frequency } from "./Frequency"
import "./AirportFrequenciesRunwaysNotams.css"

export const AirportFrequencies = ({airportId}) => {
    const [frequencyData, setFrequencyData] = useState([])

    useEffect(
        () => {
            fetchFrequencies(airportId)
                .then((data) => {
                    setFrequencyData(data)
                })
        },
        []
    )

    if (!frequencyData) {
        return null
    }
    return (
        <div className="airport__frequencies">
            <h3 className="frequencies__header">Frequencies</h3>
            <div className="frequencies__box">
            {
                frequencyData.map((freqObj, index) => {
                    return <Frequency freqObj={freqObj} key={index}/>
                    })
            }
            
            </div>
        </div>
    )
}