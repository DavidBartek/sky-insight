import { FaRegComment } from "react-icons/fa"

export const AddComment = ({newComment, updateComment}) => {
    return (
    <fieldset className="form-group">
        <label className="form__subhead">Add a comment:</label>
        <div className="input__wrapper--comments">
            <FaRegComment className="input__icon"/>
            <input
                required
                type="text"
                className="input__form"
                name="commentForm__input"
                placeholder="type comment here"
                value={newComment.comment}
                onChange={
                    (e) => {
                        const copy = {...newComment}
                        copy.comment = e.target.value
                        updateComment(copy)
                    }
                }
            />
        </div>
        
    </fieldset>
    )
}