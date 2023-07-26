import { useParams } from "react-router-dom"
import { AirportHeader } from "./header-info/AirportHeader"
import { AirportComments } from "./comments/AirportComments"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    return (
        <>
            <AirportHeader airportId={airportId}/>
            <AirportComments airportId={airportId}/>
        </>
    )
}