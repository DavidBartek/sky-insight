import { CiCircleChevUp, CiCloudSun, CiCircleInfo, CiFileOn, CiChat1 } from "react-icons/ci"

export const FloatingHeader = ({top, weather, info, docs, comments}) => {
    
    const scrollHandler = (elementRef) => {
        window.scrollTo({ top: elementRef.current.offsetTop, behavior: "smooth"})
    }

    return (
        <div className="floatingHeader">
            <div onClick={() => scrollHandler(top)} className="floatingHeader__icon"><CiCircleChevUp /></div>
            <div onClick={() => scrollHandler(weather)} className="floatingHeader__icon"><CiCloudSun /></div>
            <div onClick={() => scrollHandler(info)} className="floatingHeader__icon"><CiCircleInfo /></div>
            <div onClick={() => scrollHandler(docs)} className="floatingHeader__icon"><CiFileOn /></div>
            <div onClick={() => scrollHandler(comments)} className="floatingHeader__icon"><CiChat1 /></div>
        </div>
    )
}


{/* <div className="airportPage">
    <FloatingHeader />
    <div className="headerAndMaps">
        <AirportHeader airportId={airportId}/>
        <AirportMaps airportId={airportId}/>
    </div>
    <AirportWeather airportId={airportId} name="airportWeather"/>
    <div className="freqsRunwaysNotams">
        <AirportFrequencies airportId={airportId} name="airportFrequencies"/>
        <AirportRunways airportId={airportId} name="airportRunways"/>
        <AirportNotams airportId={airportId} name="airportNotams"/>
    </div>
    <div name="airportDocs">
        <AirportChartSupplement airportId={airportId}/>
        <AirportDiagram airportId={airportId}/>
    </div>
    <AirportComments airportId={airportId} name="airportComments"/>
</div> */}