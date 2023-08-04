import { useEffect, useState } from "react"
import { BsBookmarkStarFill} from "react-icons/bs"
import { BsBookmarkStar} from "react-icons/bs"
import { addFavoriteAirport, deleteFavoriteAirport, fetchFavoriteAirportSingle, } from "../../../DataAccess"

export const AirportFavorite = ({airportId}) => {

    const localSkyInsightUser = localStorage.getItem("skyinsight_user")
    const userObject = JSON.parse(localSkyInsightUser)

    const [airportFavoriteData, setAirportFavoriteData] = useState({id: null, faaId: null, userId: userObject.id})

    const getCurrentFavorite = () => {
        fetchFavoriteAirportSingle(userObject.id, airportId)
            .then((data) => {
                if (!data) {
                    setAirportFavoriteData(null)
                } else {
                    setAirportFavoriteData(data[0])
                }
            })
    }

    useEffect(
        () => {
            getCurrentFavorite()
        },
        []
    )

    const handleSetFavorite = (e) => {
        e.preventDefault()
        
        const favoriteObj = {
            faaId: airportId,
            userId: userObject.id
        }
        addFavoriteAirport(favoriteObj)
        getCurrentFavorite()
    }

    const handleRemoveFavorite = (e) => {
        e.preventDefault()

        deleteFavoriteAirport(airportFavoriteData.id)
        getCurrentFavorite()
    }


    if (!airportFavoriteData) {
        return (
            <button className="favorite__button--add" onClick={(e) => {handleSetFavorite(e)}}><BsBookmarkStar /></button>
        )
    } else if (airportFavoriteData.faaId === airportId) {
        return (
            <button className="favorite__button--remove" onClick={(e) => {handleRemoveFavorite(e)}}><BsBookmarkStarFill /></button>
        )
    } else {
        return null
    }
    
}