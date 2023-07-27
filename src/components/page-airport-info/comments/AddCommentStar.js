import { useState } from "react"
import { PiAirplaneFill } from "react-icons/pi"

export const AddCommentStar = ({newComment, updateComment}) => {
    
    const [hover, setHover] = useState(0)

    const handleClick = (index) => {
        const copy = {...newComment}
        copy.rating = index
        updateComment(copy)
    }
    
    const fiveStarArray = [0, 1, 2, 3, 4]

    return (
        <fieldset className="form-group">
            <div className="star-rating">
                {fiveStarArray.map((index) => {
                    index += 1
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || newComment.rating) ? "starOnClick" : "starOffClick"}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(newComment.rating)}
                        >
                            <span className="star"><PiAirplaneFill /></span>
                        </button>    
                    )
                })}
            </div>
        </fieldset>
    )
}
