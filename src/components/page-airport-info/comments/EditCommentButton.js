import { AiOutlineEdit } from "react-icons/ai"
import { RiArrowGoBackLine } from "react-icons/ri"

export const EditCommentButton = ({ editMode, setEditMode}) => {
    
    const handleEditClick = () => {
        setEditMode(true)
    }

    const handleExitEditClick = () => {
        setEditMode(false)
    }

    if (editMode) {
        return (
            <button
                className="comment__exitEditMode"
                onClick={() => handleExitEditClick()}>
                    <RiArrowGoBackLine />
            </button>
        )
    } else {
        return (
            <button 
                className="comment__editButton" 
                onClick={() => handleEditClick()}>
                    <AiOutlineEdit />
            </button>
        )
    }
    
}