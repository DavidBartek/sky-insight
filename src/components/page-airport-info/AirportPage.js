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
import { useState, useRef } from "react"

export const AirportPage = () => {
    
    const params = useParams()
    const airportId = params.airportId

    const [showComments, setShowComments] = useState(false)

    const top = useRef()
    const weather = useRef()
    const info = useRef()
    const docs = useRef()

    return (
        <div className="airportPage">
            <FloatingHeader top={top} weather={weather} info={info} docs={docs} showComments={showComments} setShowComments={setShowComments}/>
            <div className="headerAndMaps" ref={top}>
                <AirportHeader airportId={airportId}/>
                <AirportMaps airportId={airportId}/>
            </div>
            <div className="weather" ref={weather}>
                <AirportWeather airportId={airportId} />
            </div>
            <div className="freqsRunwaysNotams" ref={info}>
                <div className="dataContainer frequencies">
                    <AirportFrequencies airportId={airportId}/>
                </div>
                <div className="dataContainer runwaysNotams">
                    <AirportRunways airportId={airportId}/>
                    <AirportNotams airportId={airportId}/>
                </div>
            </div>
            <div className="airportDocs" ref={docs}>
                <AirportChartSupplement airportId={airportId}/>
                <AirportDiagram airportId={airportId}/>
            </div>
            <AirportComments airportId={airportId} showComments={showComments} setShowComments={setShowComments} name="airportComments"/>
        </div>
    )
}