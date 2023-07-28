import { CommentStar } from "./CommentStar"
import { EditCommentButton } from "./EditCommentButton"
import { DeleteComment } from "./DeleteComment"
import { useState } from "react"
import { EditComment } from "./EditComment"

export const Comment = ({id, faaId, datePosted, comment, rating, edited, dateEdited, userId, firstName, lastName, getAllComments}) => {
    
    const localSkyInsightUser = localStorage.getItem("skyinsight_user")
    const userObject = JSON.parse(localSkyInsightUser)

    const [editMode, setEditMode] = useState(false)

    const editedOrNot = (edited, dateEdited) => {
        return edited ? `Edited on ${dateEdited}` : ""
    }

    // 3 possible renderings, based on who the user is and if "edit" mode has been entered:
    // user sees his own comments with an "edit" and "delete" button.
    // user sees other users' comments without the "edit" or "delete" button.
    // if user has pressed the "edit" button on a comment, 
    // the comment text is replaced with a text input block, star rating 

    if (userObject.id === userId && !editMode) {
        return (
            <div className="comment__container">
                <div className="comment__nameAndDate">
                    <div>{firstName} {lastName[0]}.</div>
                    <div>{datePosted}</div>
                </div>
                <div className="comment__comment">{comment}</div>
                <div className="comment__starsAndEdit">
                    <CommentStar rating={rating}/>
                    <div className="comment__editDate">{editedOrNot(edited, dateEdited)}</div>
                </div>
                <div className="comment__editAndDeleteButtons">
                    <EditCommentButton editMode={editMode} setEditMode={setEditMode}/>
                    <DeleteComment
                        id={id}
                        faaId={faaId}
                        getAllComments={getAllComments} />
                </div>
            </div> 
        )
    } else if (userObject.id === userId && editMode) {
        return (
            <div className="comment__container">
                <div className="comment__nameAndDate">
                    <div>{firstName} {lastName[0]}.</div>
                    <div>{datePosted}</div>
                </div>
                <EditComment 
                    id={id} 
                    faaId={faaId} 
                    datePosted={datePosted} 
                    currentComment={comment} 
                    rating={rating}
                    edited={edited}
                    dateEdited={dateEdited}
                    userId={userId}
                    setEditMode={setEditMode}
                    getAllComments={getAllComments} />
                <div className="comment__starsAndEdit">
                    <div className="comment__editDate">{editedOrNot(edited, dateEdited)}</div>
                </div>
                <div className="comment__editAndDeleteButtons">
                    <EditCommentButton editMode={editMode} setEditMode={setEditMode}/>
                    <DeleteComment 
                        id={id}
                        faaId={faaId}
                        getAllComments={getAllComments} />
                </div>
            </div> 
        )
    } else {
        return (
            <div className="comment__container">
                <div className="comment__nameAndDate">
                    <div>{firstName} {lastName[0]}.</div>
                    <div>{datePosted}</div>
                </div>
                <div className="comment__comment">{comment}</div>
                <div className="comment__starsAndEdit">
                    <CommentStar rating={rating}/>
                    <div className="comment__editDate">{editedOrNot(edited, dateEdited)}</div>
                </div>
            </div>
        )
    }
}