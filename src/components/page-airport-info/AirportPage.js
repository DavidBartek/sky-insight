import { useParams } from "react-router-dom"
import { AirportHeader } from "./header-info/AirportHeader"
import { AirportComments } from "./comments/AirportComments"
import { AirportWeather } from "./weather/AirportWeather"
import { AirportRunways } from "./runways/AirportRunways"
import { AirportFrequencies } from "./frequencies/AirportFrequencies"
import { AirportNotams } from "./notams/AirportNotams"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    return (
        <>
            <AirportHeader airportId={airportId}/>
            <AirportWeather airportId={airportId}/>
            <AirportFrequencies airportId={airportId}/>
            <AirportRunways airportId={airportId}/>
            <AirportNotams airportId={airportId}/>
            <AirportComments airportId={airportId}/>
        </>
    )
}