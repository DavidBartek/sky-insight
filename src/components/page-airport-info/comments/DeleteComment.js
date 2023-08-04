import {AiOutlineDelete} from "react-icons/ai"
import { deleteComment } from "../../../DataAccess"

export const DeleteComment = ({id, getAllComments}) => {
    
    const handleDeleteButton = (e) => {
        e.preventDefault()
        console.log(id)
        deleteComment(id)
            .then(() => {
                getAllComments()
            })
    }
    
    return (
        <button className="comment__deleteButton" onClick={(e) => {handleDeleteButton(e)}}><AiOutlineDelete /></button>
    )
}