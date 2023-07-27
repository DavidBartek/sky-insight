// form with onsubmit property
// input field (required) - type = tex

// for stars: PiAirplaneFill and PiAirplane

import { useState } from "react"
import { AddCommentStar } from "./AddCommentStar"
import { AddComment } from "./AddComment"
import { postComment } from "../../../DataAccess"
import { useEffect } from "react"

export const AddCommentForm = ({faaId}) => {
    
    const [newComment, updateComment] = useState({
        comment: "",
        rating: 0
    })

    const localSkyInsightUser = localStorage.getItem("skyinsight_user")
    const userObject = JSON.parse(localSkyInsightUser)

    useEffect(
        () => {

        },
        [newComment]
    )

    const handleSubmitClick = (e) => {
        e.preventDefault()
        // console.log("clicked")
        
        const commentObj = {
            faaId: faaId,
            userId: userObject.id,
            datePosted: new Date().toISOString().split("T")[0],
            comment: newComment.comment,
            rating: newComment.rating,
            edited: false,
            dateEdited: null
        }

        postComment(commentObj, faaId)

        const copy = {...newComment}
        copy.comment = ""
        copy.rating = 0
        updateComment(copy)

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