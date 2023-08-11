import { BiLinkExternal } from "react-icons/bi"

export const AirportNotams = ({airportId}) => {
    
    const handleNOTAMClick = (e) => {
        e.preventDefault()
        window.open("https://notams.aim.faa.gov/notamSearch/nsapp.html#/", '_blank')
    }
    
    return (
    <div className="airport__notams">
        <button className="notams__button" onClick={(e) => handleNOTAMClick(e)}>See NOTAMs for {airportId} <BiLinkExternal /></button>
    </div>
    )
}