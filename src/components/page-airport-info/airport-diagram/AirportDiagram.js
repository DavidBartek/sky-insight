import { useEffect, useState } from "react"
import { fetchAirportDiagram } from "../../../DataAccess"

export const AirportDiagram = ({airportId}) => {
    
    const [airportDiagram, setAirportDiagram] = useState("")

    useEffect(
        () => {
            fetchAirportDiagram(airportId)
                .then((data) => {
                    setAirportDiagram(data[0]?.url)
                })
        },
        []
    )

    if (!airportDiagram || airportDiagram === "") {
        return (
            <div className="airport__airportDiagram">
                <h3 className="airportDiagram__header">Airport Diagram</h3>
                <div>No airport diagram available for {airportId}.</div>
            </div>
        )
    }
    return (
        <div className="airport__airportDiagram">
            <h3 className="airportDiagram__header">Airport Diagram</h3>
                <object 
                    className="airportDiagram__pdf"
                    data={airportDiagram}
                    type="application/pdf"
                />
        </div>
    )
}
