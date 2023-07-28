import { useParams } from "react-router-dom"
import { AirportHeader } from "./header-info/AirportHeader"
import { AirportComments } from "./comments/AirportComments"
import { AirportWeather } from "./weather/AirportWeather"
import { AirportRunways } from "./runways/AirportRunways"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    return (
        <>
            <AirportHeader airportId={airportId}/>
            <AirportWeather airportId={airportId}/>
            <AirportRunways airportId={airportId}/>
            <AirportComments airportId={airportId}/>
        </>
    )
}