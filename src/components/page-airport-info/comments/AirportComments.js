import { useEffect } from "react"
import { useState } from "react"
import { fetchComments } from "../../../DataAccess"
import { Comment } from "./Comment"
import { AddCommentForm } from "./AddCommentForm"
import "./AirportComments.css"

export const AirportComments = ({airportId}) => {
    
    // declare state variable for comments connected to airportId
    // useEffect which fetches comments data from json-server
    // render .map of comments (probably calling a new component)
    
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

    useEffect(
        () => {
            getAllComments()
        },
        [comments]
    )

    if (!comments) {
        return null
    }
    return (
        <div className="comments">
            <h3 className="comments__header">Comments</h3>
            <AddCommentForm faaId={airportId}/>
            <div className="comments__box">
                {
                    comments.map(comment => <Comment 
                        key={comment.id}
                        datePosted={comment.datePosted}
                        comment={comment.comment}
                        rating={comment.rating}
                        edited={comment.edited}
                        dateEdited={comment.dateEdited}
                        firstName={comment.user.firstName}
                        lastName={comment.user.lastName}
                        />
                    )
                }
            </div>
        </div>
    )
}