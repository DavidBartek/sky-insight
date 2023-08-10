export const PlainTextButton = ({ plainTextMode, setPlainTextMode}) => {
    
    const handlePTClick = () => {
        setPlainTextMode(true)
    }

    const handleExitPTClick = () => {
        setPlainTextMode(false)
    }

    if (plainTextMode) {
        return (
            <div className="button__container">
                {/* <button
                    className="weather__button"
                    onClick={() => handleExitPTClick()}>
                        Raw Text
                </button> */}
                View raw data
                <input
                    className="plainText__toggle on"
                    type="checkbox"
                    onClick={() => handleExitPTClick()} /> 
            </div>
            
        )
    } else {
        return (
            <div className="button__container">
                {/* <button 
                    className="weather__button" 
                    onClick={() => handlePTClick()}>
                        Plain Text
                </button> */}
                View plain text
                <input
                    className="plainText__toggle off"
                    type="checkbox"
                    onClick={() => handlePTClick()} />
            </div>
        )
    }
    
}