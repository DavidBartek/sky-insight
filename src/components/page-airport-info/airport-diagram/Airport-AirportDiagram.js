import { useEffect, useState } from "react"
import { fetchAirportDiagram, fetchChartSupplement } from "../../../DataAccess"

export const AirportDiagram = ({airportId}) => {
    
    const [airportDiagram, setAirportDiagram] = useState({})

    useEffect(
        () => {
            fetchChartSupplement(airportId)
                .then((data) => {
                    setAirportDiagram(data[0])
                })
        },
        []
    )
    
    // [
    //     {
    //         "procedure" {
    //             "url"
    //         }
    //     }
    // ]

    return (
        <div className="airport__airportDiagram">
            <h3 className="airportDiagram__header">Airport Diagram</h3>
            <div className="airportDiagram__box">
            
            </div>
        </div>
    )
}