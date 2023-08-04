export const SectionalView = ({latitudeSecs, longitudeSecs, setMapView}) => {
    
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
                        src={`https://vfrmap.com/api?req=map&type=sectc&lat=${latitudeSecs}&lon=${longitudeSecs}&zoom=10&width=450&height=350`}
                        style={{width: '450px', height: '350px', frameborder: '0'}}
                    />
                </a>
            </div>
            <button className="map__button" onClick={handleMapButton}>
            View Satellite Map
            </button>
        </div>
    )
}