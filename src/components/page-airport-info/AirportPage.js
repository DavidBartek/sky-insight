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
import { FloatingHeader } from "./FloatingHeader"
import { useRef } from "react"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    const top = useRef()
    const weather = useRef()
    const info = useRef()
    const docs = useRef()
    const comments = useRef()

    return (
        <div className="airportPage">
            <FloatingHeader top={top} weather={weather} info={info} docs={docs} comments={comments}/>
            <div className="headerAndMaps" ref={top}>
                <AirportHeader airportId={airportId}/>
                <AirportMaps airportId={airportId}/>
            </div>
            <div className="weather" ref={weather}>
                <AirportWeather airportId={airportId} />
            </div>
            <div className="freqsRunwaysNotams" ref={info}>
                <AirportFrequencies airportId={airportId}/>
                <AirportRunways airportId={airportId}/>
                <AirportNotams airportId={airportId}/>
            </div>
            <div className="airportDocs" ref={docs}>
                <AirportChartSupplement airportId={airportId}/>
                <AirportDiagram airportId={airportId}/>
            </div>
            <div className="comments" ref={comments}>
                <AirportComments airportId={airportId} name="airportComments"/>
            </div>
        </div>
    )
}