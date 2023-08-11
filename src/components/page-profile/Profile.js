import { ProfileFavorites } from "./ProfileFavorites";
import "./Profile.css"

export const Profile = () => {
    
    const localSkyInsightUser = localStorage.getItem("skyinsight_user")
    const userObject = JSON.parse(localSkyInsightUser)
    
    const convertDatestamp = (datestamp) => {
        const date = new Date(datestamp);
        const formattedTime = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        const formattedDateString = `${formattedTime}`
        return formattedDateString
    }

    return (
        <div className="profilePage">
            <div className="profile__headerContainer">
                <div className="profile__heading--main">Welcome, {userObject.firstName}.</div>
                <div className="profile__subheading">Member since {convertDatestamp(userObject.joinDate)}</div>
            </div>
            <div className="profile__favorites">
                <div className="profile__heading--favorites">Favorite Airports</div>
                <ProfileFavorites userObject={userObject}/>
            </div>
        </div>
    )
}