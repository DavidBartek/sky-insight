import { useEffect, useState } from "react"
import { fetchFavoriteAirports } from "../../DataAccess"
import { Favorite } from "./Favorite"

export const ProfileFavorites = ({userObject}) => {
    
    // fetch favorites based on logged-in userId.

    const [favoriteAirports, setFavoriteAirports] = useState([])

    const getAllFavorites = () => {
        fetchFavoriteAirports(userObject.id)
            .then(data => {
                setFavoriteAirports(data)
            })
    }

    useEffect(
        () => {
            getAllFavorites()
        },
        []
    )


    // useEffect(
    //     () => {
    //         fetchFavoriteAirports(userObject.id)
    //             .then(data => {
    //                 setFavoriteAirports(data)
    //             })
    //     },
    //     []
    // )
    
    if (!favoriteAirports) {
        return null
    }
    return (
        <div className="favorites__container">
            {
                favoriteAirports.map(favorite => 
                    <Favorite 
                        key={favorite.id} 
                        favoriteId={favorite.id} 
                        faaId={favorite.faaId}
                        getAllFavorites={getAllFavorites}/>)
            }
        </div>
    )
}