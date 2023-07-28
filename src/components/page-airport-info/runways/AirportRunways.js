import { useEffect, useState } from "react"
import { fetchAirportInfo } from "../../../DataAccess"
import { Runway } from "./Runway"
import "./AirportRunways.css"

export const AirportRunways = ({airportId}) => {
    
    const [airportData, setAirportData] = useState({})

    useEffect(
        () => {
            fetchAirportInfo(airportId)
                .then((data) => {
                    setAirportData(data)
                })
        },
        []
    )
    
    if (!airportData.runways) {
        return null
    }
    return (
        <div className="airport__runways">
            <h3 className="runways__header">Runways</h3>
            <div className="runways__box">
            {
                airportData.runways.map((runway) => {
                    return <Runway runway={runway} key={`runway--${runway.name}`}/>
                })
            }
            </div>
        </div>
    )
}