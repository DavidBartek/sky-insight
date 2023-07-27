// form with onsubmit property
// input field (required) - type = tex

// for stars: PiAirplaneFill and PiAirplane

import { useState } from "react"
import { AddCommentStar } from "./AddCommentStar"
import { AddComment } from "./AddComment"

export const AddCommentForm = () => {
    
    const [newComment, updateComment] = useState({
        comment: "",
        rating: 0
    })

    const handleSubmitClick = (e) => {
        e.preventDefault()
        console.log("uwu")
        
        // grab logged-in user's id
        // grab faa Id
        // create new Date() formatted YYYY-MM-DD
        // grab newComment.comment, newComment.rating
        // create edited: false
        // create dateEdited: null

        // return fetch function, defined in DataAccess. Pass in comment obj.

        // .then call updateComment,  resetting newComment (does there need to be a useEffect watching for this?)
    }
    
    return (
        <form className="commentForm" onSubmit={(e) => handleSubmitClick(e)}>
            
            <AddComment newComment={newComment} updateComment={updateComment} />
                
            <div className="starButtonContainer">

                <AddCommentStar newComment={newComment} updateComment={updateComment}/>

                <button className="commentForm__button" type="submit">+</button>

            </div>

        </form>
    )
}