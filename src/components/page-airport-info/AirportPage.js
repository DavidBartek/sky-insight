import { useParams } from "react-router-dom"
import { AirportHeader } from "./header-info/AirportHeader"
import { AirportComments } from "./comments/AirportComments"
import { AirportWeather } from "./weather/AirportWeather"
import { AirportRunways } from "./runways/AirportRunways"
import { AirportFrequencies } from "./frequencies/AirportFrequencies"
import { AirportNotams } from "./notams/AirportNotams"
import { AirportChartSupplement } from "./chart-supplement/AirportChartSupplement"
import { AirportDiagram } from "./airport-diagram/AirportDiagram"
import { AirportMaps } from "./maps/AirportMaps"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    return (
        <div className="airportPage">
            <AirportHeader airportId={airportId}/>
            <AirportMaps airportId={airportId}/>
            <AirportWeather airportId={airportId}/>
            <AirportFrequencies airportId={airportId}/>
            <AirportRunways airportId={airportId}/>
            <AirportNotams airportId={airportId}/>
            <AirportChartSupplement airportId={airportId}/>
            <AirportDiagram airportId={airportId}/>
            <AirportComments airportId={airportId}/>
        </div>
    )
}