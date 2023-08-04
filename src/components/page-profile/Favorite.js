import { useEffect, useState } from "react"
import { fetchAirportInfo } from "../../DataAccess"

export const Favorite = ({faaId}) => {
    
    const [airportData, setAirportData] = useState({})
    const [latitudeSecs, setLatitudeSecs] = useState("")
    const [longitudeSecs, setLongitudeSecs] = useState("")

    useEffect(
        () => {
            fetchAirportInfo(faaId)
                .then((data) => {
                    setAirportData(data)
                    setLatitudeSecs(convertDMSStrToDecStr(data.latitude_dms))
                    setLongitudeSecs(convertDMSStrToDecStr(data.longitude_dms))
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

    const airportNameStringRaw = `${airportData.name} ${airportData.facility_type}`
    const airportNameString = convertStrToTitleCase(airportNameStringRaw)

    const locationStrRaw1 = `${airportData.city},`
    const locationStrRaw2 = `${airportData.state_code}`
    const locationString = `${convertStrToTitleCase(locationStrRaw1)} ${locationStrRaw2}`

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
    
    if (!airportData) {
        return null
    }
    return (
        <div className="favorites__favorite">
            <h3 className="airport__name">{airportNameString} ({faaId})</h3>
            <h4 className="airport__location">{locationString}</h4>
            <img
                src={`https://vfrmap.com/api?req=map&type=sectc&lat=${latitudeSecs}&lon=${longitudeSecs}&zoom=10&width=450&height=350`}
                style={{width: '250px', height: '200px', frameborder: '0'}}
            />
        </div>
    )
}