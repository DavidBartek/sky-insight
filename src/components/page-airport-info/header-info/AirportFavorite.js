import { useEffect, useState } from "react"
import { BsBookmarkStarFill} from "react-icons/bs"
import { BsBookmarkStar} from "react-icons/bs"
import { BsInfoCircle } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { addFavoriteAirport, deleteFavoriteAirport, fetchFavoriteAirportSingle, } from "../../../DataAccess"

export const AirportFavorite = ({airportId}) => {

    const localSkyInsightUser = localStorage.getItem("skyinsight_user")
    const userObject = JSON.parse(localSkyInsightUser)

    const [airportFavoriteData, setAirportFavoriteData] = useState({id: null, faaId: null, userId: userObject.id})
    const [favoriteModalMessage, setFavoriteModalMessage] = useState("")

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

    useEffect(() => {
        if (favoriteModalMessage !== "") {
            //clear feedback to make sure entire element disappear after 3 seconds
            setTimeout(() => setFavoriteModalMessage(""), 3000);
        }
    }, [favoriteModalMessage])

    const handleSetFavorite = (e) => {
        e.preventDefault()

        const favoriteObj = {
            faaId: airportId,
            userId: userObject.id
        }
        addFavoriteAirport(favoriteObj)
        getCurrentFavorite()
        setFavoriteModalMessage(`Airport added to favorites!`)
    }

    const handleRemoveFavorite = (e) => {
        e.preventDefault()

        deleteFavoriteAirport(airportFavoriteData.id)
        getCurrentFavorite()
        setFavoriteModalMessage(`Airport removed from favorites.`)
    }

    const handleModalClose = (e) => {
        e.preventDefault()

        setFavoriteModalMessage("")
    }

    if (!airportFavoriteData) {
        return (
            <>
                <button className="favorite__button--add" onClick={(e) => {handleSetFavorite(e)}}><BsBookmarkStar /></button>
                <div className={favoriteModalMessage === "" ? "modal__invisible" : "modal__deleted"}>
                    <div className="icon__container">
                        <BsInfoCircle /> 
                        <button className="icon__x" onClick={(e) => {handleModalClose(e)}}><GrClose/></button>
                    </div>
                    {favoriteModalMessage}
                </div> 
            </>
        )
    } else if (airportFavoriteData.faaId === airportId) {
        return (
            <>
                <button className="favorite__button--remove" onClick={(e) => {handleRemoveFavorite(e)}}><BsBookmarkStarFill /></button>
                <div className={favoriteModalMessage === "" ? "modal__invisible" : "modal__added"}>
                    <div className="icon__container">
                        <BsInfoCircle /> 
                        <button className="icon__x" onClick={(e) => {handleModalClose(e)}}><GrClose/></button>
                    </div>
                    {favoriteModalMessage}
                </div>    
            </>
        )
    } else {
        return null
    }
    
}