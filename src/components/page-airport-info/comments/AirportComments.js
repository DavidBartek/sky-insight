import { useEffect } from "react"
import { useState } from "react"
import { fetchComments } from "../../../DataAccess"
import { Comment } from "./Comment"
import { AddCommentForm } from "./AddCommentForm"
import { MdOutlineClose } from "react-icons/md"
import "./AirportComments.css"

export const AirportComments = ({airportId, showComments, setShowComments}) => {
    
    const [comments, setComments] = useState([])

    const getAllComments = () => {
        fetchComments(airportId)
            .then((data) => {
                setComments(data)
            })
    }

    useEffect(
        () => {
            getAllComments()
        },
        []
    )

    const handleClose = () => {
        setShowComments(false)
    }

    if (!comments) {
        return null
    } else if (showComments) {
        return (
            <div className="comments">
                <button className="comments__close" onClick={() => handleClose()}><MdOutlineClose /></button>
                <div className="comments__header">Comments for {airportId}</div>
                <AddCommentForm faaId={airportId} getAllComments={getAllComments}/>
                
                {comments.length === 0 ? 
                    <div className="comments__box--empty">Be the first to add a comment</div> 
                    : <div className="comments__box">
                        { comments.map(comment => <Comment 
                            key={`comment--${comment.id}`}
                            id={comment.id}
                            faaId={airportId}
                            datePosted={comment.datePosted}
                            comment={comment.comment}
                            rating={comment.rating}
                            edited={comment.edited}
                            dateEdited={comment.dateEdited}
                            userId={comment.userId}
                            firstName={comment.user.firstName}
                            lastName={comment.user.lastName}
                            getAllComments={getAllComments}
                            />)}
                    </div>
                }
            </div>
        )
    } else if (!showComments) {
        return (
            null
        )
    }
    
}