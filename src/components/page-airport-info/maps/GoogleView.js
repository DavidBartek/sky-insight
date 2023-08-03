import { googleAPIKey } from "../../../GoogleAPIKey"

export const GoogleView = ({airportId, setMapView}) => {
    
    const handleMapButton = () => {
        setMapView("sectional")
    }
    
    return (
        <div className="map__container">
            <div className="map__image">
                <iframe
                    style={{width: '450px', height: '350px', frameborder: '0'}}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${airportId}+airport&maptype=satellite&zoom=11`}
                    allowFullScreen>
                </iframe>
            </div>
            <button className="map__button" onClick={handleMapButton}>
            View Sectional Chart
            </button>
        </div>
    )
}

// style={{width: '350px', height: '350px'}}