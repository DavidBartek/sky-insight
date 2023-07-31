import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { SearchButton } from "./SearchButton"
import { fetchSearchSuggestions } from "../../DataAccess"

export const SearchBar = ({ setResults, searchBarText, selection }) => {
    
    const [input, setInput] = useState("")

    useEffect(
        () => {
            fetchResults("")
                
        },
        []
    )

    const fetchResults = (value) => {
        fetchSearchSuggestions()
            .then((data) => {
                // console.log(data)
                const results = data.filter((airport) => {
                    return (value.length >= 3 && airport.ARPT_ID && airport.ARPT_ID.toLowerCase().includes(value)) 
                        || (value.length >= 3 && airport.ARPT_NAME && airport.ARPT_NAME.toLowerCase().includes(value))
                })
                setResults(results)
            }
    )}

    const handleChange = (value) => {
        setInput(value)
        fetchResults(value)
    }

    return (
    <div className="searchBar__wrapper">
        <FaSearch className="searchBar__input--icon"/>
        <input className="searchBar__input" 
            placeholder='Search by airport name or ID (e.g. BNA)'
            value={searchBarText || input}
            onChange={(e) => handleChange(e.target.value)}/>
        <SearchButton selection={selection}/>
    </div>
    )
}