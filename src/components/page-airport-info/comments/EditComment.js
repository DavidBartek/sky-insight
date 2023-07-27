import { useState } from "react"

export const EditComment = ({currentComment}) => {
    
    const [editedComment, setEditedComment] = useState(`${currentComment}`)

    const localSkyInsightUser = localStorage.getItem("skyinsight_user")
    const userObject = JSON.parse(localSkyInsightUser)

    // is the above code block needed?

    const handleSubmitClick = (e) => {
        e.preventDefault()
        console.log(editedComment)
        // PUT
        // access via commentId
        // will modify comment content; set edited to true; create an editedDate
        // set editing mode to off
    }
    
    // much of the code below is a copy/modification of AddCommentForm.js and its children.

    return (
        <form className="commentEditForm" onSubmit={(e) => handleSubmitClick(e)}>
            
            <fieldset className="form-group">
                <textarea
                    type="text"
                    className="commentEditForm__textarea"
                    name="commentEditForm__input"
                    placeholder={editedComment}
                    value={editedComment}
                    onChange={
                        (e) => {
                            let copy = {...editedComment}
                            copy = e.target.value
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


