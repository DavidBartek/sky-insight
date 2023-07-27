export const AddComment = ({newComment, updateComment}) => {
    return (
    <fieldset className="form-group">
        <input
            required
            type="text"
            className=""
            placeholder="Add a comment"
            value={newComment.comment}
            onChange={
                (e) => {
                    const copy = {...newComment}
                    copy.comment = e.target.value
                    updateComment(copy)
                }
            }
        />
    </fieldset>
    )
}