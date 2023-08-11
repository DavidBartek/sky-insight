import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
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
                const lowercaseValue = value.toLowerCase()
                const results = data.filter((airport) => {
                    return (lowercaseValue.length >= 3 && airport.ARPT_ID && airport.ARPT_ID.toLowerCase().includes(lowercaseValue)) 
                        || (lowercaseValue.length >= 3 && airport.ARPT_NAME && airport.ARPT_NAME.toLowerCase().includes(lowercaseValue))
                })
                console.log(results)
                setResults(results)
            }
    )}

    const handleChange = (value) => {
        setInput(value)
        fetchResults(value)
    }

    return (
    <>
        <div className="searchBar__wrapper">
            <FaSearch className="searchBar__input--icon"/>
            <input className="searchBar__input"
                placeholder='Search by airport name or ID (e.g. BNA)'
                value={searchBarText || input}
                onChange={(e) => handleChange(e.target.value)}/>
        </div>
        <SearchButton selection={selection}/>
    </>
    )
}