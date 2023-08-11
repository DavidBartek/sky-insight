import { useEffect, useState } from "react"
import { fetchFavoriteAirports } from "../../DataAccess"
import { Favorite } from "./Favorite"

export const ProfileFavorites = ({userObject}) => {
    
    // fetch favorites based on logged-in userId.

    const [favoriteAirports, setFavoriteAirports] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    const getAllFavorites = () => {
        fetchFavoriteAirports(userObject.id)
            .then(data => {
                setFavoriteAirports(data)
                setCurrentIndex(0)
            })
    }

    useEffect(
        () => {
            getAllFavorites()
        },
        []
    )

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % favoriteAirports.length;
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + favoriteAirports.length) % favoriteAirports.length;
        setCurrentIndex(newIndex);
    };


    if (!favoriteAirports) {
        return null
    } else if (favoriteAirports.length === 0) {
        return <div className="profile__noFavorites">Go add an airport to your favorites!</div>
    } else {
        return (
            <div className="carousel-container">
                <button className="carousel-button prev-button" onClick={prevSlide}>
                    &lt;
                </button>
                <div className="favorites__container">
                    {favoriteAirports.map((favorite, index) => (
                        <div
                            key={favorite.id}
                            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            <Favorite
                                favoriteId={favorite.id}
                                faaId={favorite.faaId}
                                getAllFavorites={getAllFavorites}
                            />
                        </div>
                    ))}
                </div>
                <button className="carousel-button next-button" onClick={nextSlide}>
                    &gt;
                </button>
            </div>
        );
    }

    
}


 // return (
    //     <div className="favorites__container">
    //         {
    //             favoriteAirports.map(favorite => 
    //                 <Favorite 
    //                     key={favorite.id} 
    //                     favoriteId={favorite.id} 
    //                     faaId={favorite.faaId}
    //                     getAllFavorites={getAllFavorites}/>)
    //         }
    //     </div>
    // )