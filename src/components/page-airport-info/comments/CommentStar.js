import { PiAirplaneFill } from "react-icons/pi"

export const CommentStar = ({rating}) => {
    
    const fiveStarArray = [0, 1, 2, 3, 4]
    
    return (
    <div className="comment__starRating">
        {fiveStarArray.map((index) => {
            index += 1
            return (
                <span
                    type="button"
                    key={index}
                    className={index <= (rating) ? "starOn" : "starOff"}
                >
                    <span className="star"><PiAirplaneFill /></span>
                </span>    
            )
        })}
    </div>
    )
}