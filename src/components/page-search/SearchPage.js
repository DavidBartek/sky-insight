import { useState } from "react"
import { SearchBar } from "./SearchBar"
import "./SearchPage.css"
import { SearchResultsList } from "./SearchResultsList"

export const SearchPage = () => {
    
    const [results, setResults] = useState([])
    const [selection, setSelection] = useState({})
    const [searchBarText, setSearchBarText] = useState("")
    
    return (
    <div className="searchPage">
        <div className="searchPage__title">
            <img className="searchPage__title--header" src="SkyInsight_e38260.svg"></img>
            <div className="searchPage__title--subheader">The one-stop pre-flight planning resource</div>
        </div>
        <div className="search__bar">
            <SearchBar 
                setResults={ setResults } 
                searchBarText={ searchBarText }
                selection={ selection } 
                results={results}/>
            <SearchResultsList 
                results={ results } 
                setSearchBarText={ setSearchBarText } 
                setSelection={ setSelection } 
                setResults={ setResults }/>
        </div>
    </div>
    )
}