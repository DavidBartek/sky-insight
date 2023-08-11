import {MdFlightTakeoff} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const SearchButton = ({selection}) => {
    
    const navigate = useNavigate()

    const handleSearch = () => {
        const airportId = selection.ARPT_ID
        navigate(`/airports/${airportId}`)

    }
    
    return (
        <button className="searchBar__button" tabIndex={0} onClick={handleSearch}>
            {/* <MdFlightTakeoff className="searchBar__button--icon"/> */}
            go
        </button>
    )
}