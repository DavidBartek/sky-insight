import { useEffect, useState } from "react"
import { deleteFavoriteAirport, fetchAirportInfo } from "../../DataAccess"
import { GoBookmarkSlash } from "react-icons/go"
import { RiArrowGoBackLine } from "react-icons/ri"
import { AiOutlineDelete } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

export const Favorite = ({favoriteId, faaId, getAllFavorites}) => {
    
    const [airportData, setAirportData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [latitudeSecs, setLatitudeSecs] = useState("")
    const [longitudeSecs, setLongitudeSecs] = useState("")
    const [deleteConfirmMode, setDeleteConfirmMode] = useState(false)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetchAirportInfo(faaId)
                .then((data) => {
                    setAirportData(data)
                    setLatitudeSecs(convertDMSStrToDecStr(data.latitude_dms))
                    setLongitudeSecs(convertDMSStrToDecStr(data.longitude_dms))
                    setIsLoading(false)
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

    const navigateToAirport = () => {
        navigate(`/airports/${faaId}`)
    }

    const handleDeleteConfirmModeOn = () => {
        setDeleteConfirmMode(true)
    }

    const handleDeleteConfirmModeOff = () => {
        setDeleteConfirmMode(false)
    }

    const handleDeleteFavorite = () => {
        // e.preventDefault()

        deleteFavoriteAirport(favoriteId)

        getAllFavorites()
    }

    if (!airportData) {
        return null
    } else if (deleteConfirmMode === false) {
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
                    <div className="favorites__favorite">
                        <button className="favorite__delete" onClick={() => handleDeleteConfirmModeOn()}><GoBookmarkSlash /></button>
                        <img className="favorite__image"
                            src={`https://vfrmap.com/api?req=map&type=sectc&lat=${latitudeSecs}&lon=${longitudeSecs}&zoom=10&width=600&height=347`}
                            onClick={navigateToAirport}
                        />
                        <div className="favorite__name">{airportNameString} ({faaId})</div>
                        <div className="favorite__location">{locationString}</div>
                    </div>
                )}
            </>
        )
    } else  if (deleteConfirmMode === true) {
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
                    <div className="favorites__favorite">
                        <div className="delete__confirmContainer">
                            <div style={{fontWeight: 'bold'}}>Delete {faaId} from favorites</div>
                            <div>Are you sure?</div>
                            <div className="delete__iconsContainer">
                                <button className="delete__confirmIcon undo" onClick={() => handleDeleteConfirmModeOff()}><RiArrowGoBackLine /></button>
                                <button className="delete__confirmIcon confirm" onClick={() => handleDeleteFavorite()}><AiOutlineDelete /></button>
                            </div>
                        </div>
                        <img className="favorite__image"
                            src={`https://vfrmap.com/api?req=map&type=sectc&lat=${latitudeSecs}&lon=${longitudeSecs}&zoom=10&width=600&height=347`}
                            onClick={navigateToAirport}
                        />
                        <div className="favorite__name">{airportNameString} ({faaId})</div>
                        <div className="favorite__location">{locationString}</div>
                    </div>
                )}
            </>
        )
    }
    
}