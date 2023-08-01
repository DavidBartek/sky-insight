export const PlainTextButton = ({ plainTextMode, setPlainTextMode}) => {
    
    const handlePTClick = () => {
        setPlainTextMode(true)
    }

    const handleExitPTClick = () => {
        setPlainTextMode(false)
    }

    if (plainTextMode) {
        return (
            <button
                className="weather__button"
                onClick={() => handleExitPTClick()}>
                    Raw Text
            </button>
        )
    } else {
        return (
            <button 
                className="weather__button" 
                onClick={() => handlePTClick()}>
                    Plain Text
            </button>
        )
    }
    
}