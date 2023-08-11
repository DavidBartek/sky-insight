import { useEffect, useState } from "react"
import { fetchAirportInfo } from "../../../DataAccess"
import { SectionalView } from "./SectionalView"
import { GoogleView } from "./GoogleView"
import "./AirportMaps.css"

export const AirportMaps = ({airportId}) => {

    const [latitudeSecs, setLatitudeSecs] = useState("")
    const [longitudeSecs, setLongitudeSecs] = useState("")
    const [mapView, setMapView] = useState("sectional")
    // mapView "sectional" = sectional chart view; mapView "google" = Google map view

    useEffect(
        () => {
            fetchAirportInfo(airportId)
                .then((data) => {
                    setLatitudeSecs(convertDMSStrToDecStr(data.latitude_dms))
                    setLongitudeSecs(convertDMSStrToDecStr(data.longitude_dms))
                })  
        },
        []
    )

    const convertDMSStrToDecStr = (DMScoordStringRaw) => {
        // data comes formatted: "36-07-28.1100N"
        const direction = DMScoordStringRaw.slice(-1)
        const coordinates = DMScoordStringRaw.slice(0, -1)

        const [degrees, minutes, seconds] = coordinates.split('-')

        const degreesInt = parseInt(degrees)
        const minutesInt = (parseFloat(minutes))/60
        const secondsInt = (parseFloat(seconds))/3600

        let decCoordsInt = 0

        if (direction === "W" || direction === "S") {
            decCoordsInt = (degreesInt + minutesInt + secondsInt) * -1
        } else {
            decCoordsInt = degreesInt + minutesInt + secondsInt
        }

        const decCoordsStr = decCoordsInt.toString()
        // console.log(decCoordsStr)

        return decCoordsStr
    }

    if (!latitudeSecs || !longitudeSecs) {
        return (
            <div className="airport__map">
                <div></div>
            </div>
        )
    } else if (mapView === "sectional") {
        return (
            <div className="airport__map">
                <SectionalView latitudeSecs={latitudeSecs} longitudeSecs={longitudeSecs} setMapView={setMapView}/>
            </div>
        )
    } else if (mapView === "google") {
        return (
            <div className="airport__map">
                <GoogleView airportId={airportId} latitudeSecs={latitudeSecs} longitudeSecs={longitudeSecs} setMapView={setMapView}/>
            </div>
        )
    }
    
}
