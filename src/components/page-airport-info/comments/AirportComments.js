import { useEffect } from "react"
import { useState } from "react"
import { fetchComments } from "../../../DataAccess"

export const AirportComments = ({airportId}) => {
    
    // declare state variable for comments connected to airportId
    // useEffect which fetches comments data from json-server
    // render .map of comments (probably calling a new component)
    
    const [comments, setComments] = useState([])

    useEffect(
        () => {
            fetchComments(airportId)
                .then((data) => {
                    setComments(data)
                })
        },
        []
    )
    
    if (!comments) {
        return null
    }
    return (
        <div className="comments">
            <h2 className="comments__header">Comments</h2>
            <div className="comments__box">
                {
                    comments.map(comment => {
                        return <div className="comments__comment" key={comment.id}>{comment.comment} INSERT COMPONENT HERE
                        </div>
                    })
                }
            </div>
        </div>
    )
}