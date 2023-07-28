import { useEffect } from "react"
import { useState } from "react"
import { fetchComments } from "../../../DataAccess"
import { Comment } from "./Comment"
import { AddCommentForm } from "./AddCommentForm"
import "./AirportComments.css"

export const AirportComments = ({airportId}) => {
    
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

    if (!comments) {
        return null
    }
    return (
        <div className="comments">
            <h3 className="comments__header">Comments</h3>
            <AddCommentForm faaId={airportId} getAllComments={getAllComments}/>
            <div className="comments__box">
                {
                    comments.map(comment => <Comment 
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
                        />
                    )
                }
            </div>
        </div>
    )
}