import { ProfileFavorites } from "./ProfileFavorites";

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
        <>
            <div className="profile__header">
                <h1>Welcome, {userObject.firstName}.</h1>
                <h3>Member since {convertDatestamp(userObject.joinDate)}</h3>
            </div>
            <div className="profile__favorites">
                <h1 className="favorites__header">Favorite Airports</h1>
                <ProfileFavorites userObject={userObject}/>
            </div>
        </>
    )
}