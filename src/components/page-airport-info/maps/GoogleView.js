import { googleAPIKey } from "../../../GoogleAPIKey"
import { MdMap } from "react-icons/md"

// https://developers.google.com/maps/documentation/embed/embedding-map

// two src options below - 
// place mode: accepts airportId as a query. Has a popup with useful info but is ugly.
// view mode: most straightforward.

export const GoogleView = ({airportId, latitudeSecs, longitudeSecs, setMapView}) => {
    
    const handleMapButton = () => {
        setMapView("sectional")
    }
    
    return (
        <div className="map__container">
            <div className="map__image">
                <iframe
                    className="map__styling--satellite"
                    referrerPolicy="no-referrer-when-downgrade"
                    // src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${airportId}+airport&maptype=satellite&zoom=11`}
                    src={`https://www.google.com/maps/embed/v1/view?key=${googleAPIKey}&center=${latitudeSecs},${longitudeSecs}&maptype=satellite&zoom=13`}
                    allowFullScreen>
                </iframe>
                <div className="map__fade"></div>
            </div>
            <button className="map__button" onClick={handleMapButton}>
                <MdMap />
            </button>
        </div>
    )
}