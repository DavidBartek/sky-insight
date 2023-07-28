import { useState } from "react"
import { modifyComment } from "../../../DataAccess"

export const EditComment = ({id, faaId, datePosted, currentComment, rating, edited, dateEdited, userId, setEditMode}) => {
    
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
        modifyComment(editedFinal)
        setEditMode(false)
    }
    
    // much of the code below is a copy/modification of AddCommentForm.js and its children.

    return (
        <form className="commentEditForm" onSubmit={(e) => handleSubmitClick(e)}>
            
            <fieldset className="form-group">
                <textarea
                    type="text"
                    className="commentEditForm__textarea"
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
            </fieldset>
                        
            <div className="starButtonContainer">

                <button className="commentEditForm__button" type="submit">Submit</button>

            </div>

        </form>
    )
}


