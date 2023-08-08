import { MdOutlineSatelliteAlt } from "react-icons/md"

export const SectionalView = ({latitudeSecs, longitudeSecs, setMapView}) => {
    
    const windowWidth = window.innerWidth;

    const handleMapButton = () => {
        setMapView("google")
    }
    
    return (
        <div className="map__container">
            <div className="map__image">
                <a 
                    href={`https://vfrmap.com/?type=vfrc&lat=${latitudeSecs}&lon=${longitudeSecs}&zoom=10`}
                    target="_blank"
                    rel="noreferrer">
                    <img
                        className="map__styling--sectional"
                        src={`https://vfrmap.com/api?req=map&type=sectc&lat=${latitudeSecs}&lon=${longitudeSecs}&zoom=11&width=${windowWidth}&height=200`}
                    />
                </a>
                <div className="map__fade"></div>
            </div>
            <button className="map__button" onClick={handleMapButton}>
                <MdOutlineSatelliteAlt/>
            </button>
        </div>
    )
}