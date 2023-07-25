import { useState } from "react"
import { SearchBar } from "./SearchBar"
import "./SearchPage.css"
import { SearchResultsList } from "./SearchResultsList"

export const SearchPage = () => {
    
    const [results, setResults] = useState([]) // displays array of airports matching 
    const [selection, setSelection] = useState({})
    const [searchBarText, setSearchBarText] = useState("")
    
    return (
    <>
        <div className="searchPage__title">
            <h1 className="searchPage__title--header">SkyInsight</h1>
            <h2 className="searchPage__title--subheader">The one-stop pre-flight planning resource</h2>
        </div>
        <div className="search__bar">
            <SearchBar 
                setResults={ setResults } 
                searchBarText={searchBarText}
                selection={selection} />
            <SearchResultsList 
                results={ results } 
                setSearchBarText={setSearchBarText} 
                setSelection={setSelection} 
                setResults={setResults}/>
        </div>
    </>
    )
}