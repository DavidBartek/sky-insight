export const SearchResultsList = ({results, setSearchBarText, setSelection, setResults}) => {
    
    const handleResultSelect = (result) => {
        
        const textToDisplay = `${result.ARPT_NAME} (${result.ARPT_ID})`
        // alert(`clicked on ${result.ARPT_NAME}`)
        setSelection(result) // sets selection to airport object
        setSearchBarText(textToDisplay) // sets text displayed in search bar to selected airport's name + ID
        setResults([]) // resets results list to empty
    }

    return (
        <div className="searchBar__results">
            {
                results.map((result, id) => {
                    return <div className="searchBar__result" key={id} onClick={() => handleResultSelect(result)}>
                        {result.ARPT_NAME} ({result.ARPT_ID})
                    </div>
                })
            }
        </div>
    )

}