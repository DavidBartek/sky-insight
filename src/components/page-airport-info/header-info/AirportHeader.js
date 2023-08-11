import { useEffect, useState } from "react"
import { fetchAirportInfo } from "../../../DataAccess"
import { AirportFavorite } from "./AirportFavorite"
import "./AirportHeader.css"
import { ThreeDots } from "react-loader-spinner"

export const AirportHeader = ({airportId}) => {

    const [airportData, setAirportData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // // console.log(airportId)

    useEffect(
        () => {
            fetchAirportInfo(airportId)
                .then((data) => {
                    setAirportData(data)
                    setIsLoading(false)
                    // console.log("airport data:", data)
                })
        },
        []
    )
    
    const convertStrToTitleCase = (string) => {
        return string
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }
    
    const convertStrToDMSCoords = (coordStringRaw) => {
        const direction = coordStringRaw.slice(-1)
        const coordinates = coordStringRaw.slice(0, -1)

        const [degrees, minutes, seconds] = coordinates.split('-')

        const coordinateString = `${degrees}° ${minutes}' ${seconds}" ${direction}`

        return coordinateString
    }

    const airportNameStringRaw = `${airportData.name} ${airportData.facility_type}`
    const airportNameString = convertStrToTitleCase(airportNameStringRaw)
    
    const ownershipStringRaw = `${airportData.ownership_type} ${airportData.facility_type}`
    const ownershipString = convertStrToTitleCase(ownershipStringRaw)

    const mileOrMiles = airportData.distance_from_city > 1 ? "miles" : "mile"
    const locationStrRaw1 = `${airportData.distance_from_city} ${mileOrMiles} ${airportData.direction_from_city} of`
    const locationStrRaw2 = `${airportData.city},`
    const locationStrRaw3 = `${airportData.state_code}`
    const locationString = `${locationStrRaw1} ${convertStrToTitleCase(locationStrRaw2)} ${locationStrRaw3}`

    const latitudeStrRaw = `${airportData.latitude_dms}`
    const longitudeStrRaw = `${airportData.longitude_dms}`
    const latitudeString = `${convertStrToDMSCoords(latitudeStrRaw)}`
    const longitudeString = `${convertStrToDMSCoords(longitudeStrRaw)}`

    if (!airportData) {
        return null
    } else {
        return (
            <>
                {isLoading ? (
                    <ThreeDots 
                        className="loadingGraphic"
                        height="80" 
                        width="80" 
                        radius="9"
                        color="#e38260" 
                        ariaLabel="three-dots-loading"
                        visible={true}
                    />
                ) : (
                <div className="airport__header">
                    <div className="header__container">
                        <div className="title__container">
                            <div className="header__name">{airportNameString}</div>
                            <div className="idFav__container">
                                <div className="header__id">{airportData.icao_id || airportData.faa_id}</div>
                                <div className="header__favorite">
                                    <AirportFavorite airportId={airportId}/>
                                </div>
                            </div>
                        </div>
                        <div className="header__infoBar">
                            <div className="infoBar__container">
                                <div className="infoBar__data--header">Ownership</div>
                                <div className="infoBar__data">{ownershipString} //</div>
                                <div className="infoBar__data">{locationString}</div>
                            </div>
                            <div className="infoBar__container">
                                <div className="infoBar__data--header">Elevation</div>
                                <div className="infoBar__data">{airportData.elevation}' MSL</div>
                            </div>
                            <div className="infoBar__container">
                                <div className="infoBar__data--header">Pattern Altitude</div>
                                <div className="infoBar__data">{airportData.elevation + 1000}' MSL</div>
                            </div>
                            <div className="infoBar__container">
                                <div className="infoBar__data--header">Coordinates</div>
                                <div className="infoBar__data">{latitudeString}</div>
                                <div className="infoBar__data">{longitudeString}</div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </>
        )
    }
}

// keys to be interpolated:
// {name} Airport
// ({icao_id})
// {ownership_type} {facility_type} {distance_from_city} miles {direction_from_city} of {city}, {state_code}
// Coordinates: {latitude_dms} {longitude_dms}
// Elevation: {elevation}' MSL