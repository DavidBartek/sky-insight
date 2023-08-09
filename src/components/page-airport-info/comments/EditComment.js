import { useState } from "react"
import { modifyComment } from "../../../DataAccess"
import { AddCommentStar } from "./AddCommentStar"

export const EditComment = ({id, faaId, datePosted, currentComment, rating, edited, dateEdited, userId, setEditMode, getAllComments}) => {
    
    const [editedComment, setEditedComment] = useState({
        id: id,
        faaId: faaId,
        userId: userId,
        datePosted: datePosted,
        comment: currentComment,
        rating: rating,
        edited: edited,
        dateEdited: dateEdited
    })

    const handleSubmitClick = (e) => {
        e.preventDefault()
        const editedFinal = {...editedComment}
        editedFinal.edited = true
        editedFinal.dateEdited = new Date().toISOString().split("T")[0]
        modifyComment(editedFinal) // API PUT
            .then(setEditMode(false))
            .then(() => {
                getAllComments()
            })
    }
    
    // much of the code below is a copy/modification of AddCommentForm.js and its children.

    return (
        <form className="commentEditForm" onSubmit={(e) => handleSubmitClick(e)}>
            
            <fieldset className="form-group">
                <label className="form__subhead">Edit comment below.</label>
                <div className="input__wrapper--comments">
                    <input
                        type="text"
                        className="input__form"
                        name="commentEditForm__input"
                        placeholder={editedComment.comment}
                        value={editedComment.comment}
                        onChange={
                            (e) => {
                                let copy = {...editedComment}
                                copy.comment = e.target.value
                                setEditedComment(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
                        
            <div className="starButtonContainer--edit">
                <AddCommentStar newComment={editedComment} updateComment={setEditedComment} />
                <button className="commentEditForm__button" type="submit">Submit</button>

            </div>

        </form>
    )
}


