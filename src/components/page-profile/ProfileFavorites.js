import { useEffect, useState } from "react"
import { fetchFavoriteAirports } from "../../DataAccess"
import { Favorite } from "./Favorite"

export const ProfileFavorites = ({userObject}) => {
    
    // fetch favorites based on logged-in userId.

    const [favoriteAirports, setFavoriteAirports] = useState([])

    useEffect(
        () => {
            fetchFavoriteAirports(userObject.id)
                .then(data => {
                    setFavoriteAirports(data)
                })
        },
        []
    )

    // once airport Ids are fetched:
    // 
    
    if (!favoriteAirports) {
        return null
    }
    return (
        <div className="favorites__container">
            {
                favoriteAirports.map(favorite => <Favorite key={favorite.id} faaId={favorite.faaId}/>)
            }
        </div>
    )
}