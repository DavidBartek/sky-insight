import { useEffect, useState } from "react"
import { fetchAirportInfo } from "../../../DataAccess"
import { FaDirections } from "react-icons/fa"

export const AirportHeader = ({airportId}) => {

    const [airportData, setAirportData] = useState({})

    // console.log(airportId)

    useEffect(
        () => {
            fetchAirportInfo(airportId)
                .then((data) => {
                    setAirportData(data)
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
    
    const mileOrMiles = airportData.distance_from_city > 1 ? "miles" : "mile"
    const locationStrRaw1 = `${airportData.ownership_type} ${airportData.facility_type}`
    const locationStrRaw2 = `${airportData.distance_from_city} ${mileOrMiles} ${airportData.direction_from_city} of`
    const locationStrRaw3 = `${airportData.city},`
    const locationStrRaw4 = `${airportData.state_code}`
    const locationString = `${convertStrToTitleCase(locationStrRaw1)} ${locationStrRaw2} ${convertStrToTitleCase(locationStrRaw3)} ${locationStrRaw4}`

    const latitudeStrRaw = `${airportData.latitude_dms}`
    const longitutdeStrRaw = `${airportData.longitude_dms}`
    const coordinatesString = `${convertStrToDMSCoords(latitudeStrRaw)} ${convertStrToDMSCoords(longitutdeStrRaw)}`

    if (!airportData) {
        return null
    } else {
        return (
            <div className="airport__header">
                <h2>{airportNameString}</h2>
                <h2>({airportData.icao_id || airportData.faa_id})</h2>
                <h4>{locationString}</h4>
                <h4>Coordinates: {coordinatesString}</h4>
                <h4>Elevation: {airportData.elevation}' MSL (Pattern Altitude: {airportData.elevation + 1000}' MSL)</h4>
            </div>
        )
    }
}

// keys to be interpolated:
// {name} Airport
// ({icao_id})
// {ownership_type} {facility_type} {distance_from_city} miles {direction_from_city} of {city}, {state_code}
// Coordinates: {latitude_dms} {longitude_dms}
// Elevation: {elevation}' MSL