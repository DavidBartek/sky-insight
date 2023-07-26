import { useParams } from "react-router-dom"
import { AirportHeader } from "./header-info/AirportHeader"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    return (
        <>
            <AirportHeader airportId={airportId}/>
        </>
    )
}